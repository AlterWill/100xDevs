import express from 'express';
const app = express();
const PORT = 3000;
import cors from 'cors'
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import dotenv from 'dotenv'


app.use(express.json())
app.use(cors())

dotenv.config()

//const client = new GoogleGenAI({ apiKey: JSON.stringify(process.env.GEMINI_API_KEY) })

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SANDBOX_ROOT = path.resolve(__dirname, '../../sandbox');

function sandboxPath(relativePath = '') {
  const fullPath = path.resolve(SANDBOX_ROOT, relativePath);

  if (!fullPath.startsWith(path.resolve(SANDBOX_ROOT))) {
    throw new Error('Path escapes sandbox');
  }

  return fullPath;
}

async function askGemini(prompt) {
  const response = await client.models.generateContent({
    model: process.env.MODEL,
    contents: prompt
  })
  console.log(response.text)
  return response;
}

function ReadDirectoryFunction(filePath) {
  const fullPath = sandboxPath(filePath)
  const files = fs.readdirSync(fullPath)
  return files
}

const readDirectoryTool = {
  type: "function",
  name: "read_directory",
  description: "List files and folders inside a sandbox directory",
  parameters: {
    type: "OBJECT",
    properties: {
      folderPath: {
        type: "string",
      }
    },
    required: ["folderPath"]
  }
};

const readFileTool = {
  type: "function",
  name: "read_file",
  description: "Read contents of a file inside sandbox",
  parameters: {
    type: "OBJECT",
    properties: {
      filePath: {
        type: "STRING",
        description: "Path and name of file inside sandbox"
      },
    },
    required: ["filePath"]
  }
};

function WriteFileFunction(filePath, data) {
  const fullPath = sandboxPath(filePath)
  const dir = path.dirname(fullPath)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(fullPath, data, 'utf-8');
  return `wrote file ${filePath}`
}

const writeFileTool = {
  type: "function",
  name: "write_file",
  description: "Create or overwrite a file inside sandbox",
  parameters: {
    type: "OBJECT",
    properties: {
      filePath: {
        type: "STRING",
        description: "path of the file inside sandbox"
      },
      content: {
        type: "STRING",
        description: "content of the file that is been written in sandbox"
      },
    },
    required: ["filePath", "content"]
  }
};

function bashCommandCallTool(bashCommand, folderPath = '') {
  const fullPath = sandboxPath(folderPath)
  try {
    const output = execSync(bashCommand, { cwd: fullPath, encoding: 'utf-8' });
    return output
  } catch (error) {
    return `Command failed:${error.message}`
  }
}

const createFolderTool = {
  type: "function",
  name: "create_folder",
  description: "Create a directory inside sandbox",
  parameters: {
    type: "OBJECT",
    properties: {
      folderPath: {
        type: "STRING"
      }
    },
    required: ["folderPath"]
  }
};

const deleteFileTool = {
  type: "function",
  name: "delete_file",
  description: "Delete a file inside sandbox",
  parameters: {
    type: "OBJECT",
    properties: {
      filePath: {
        type: "STRING",
        description: "Path and name of the file to be deleted and it should and only be of paths inside sandbox"
      },
    },
    required: ["filePath"]
  }
};

const runBashTool = {
  type: "function",
  name: "run_bash",
  description: "Run a bash command inside sandbox folder only",
  parameters: {
    type: "OBJECT",
    properties: {
      command: {
        type: "STRING",
        description: "Shell command to run"
      },
      cwd: {
        type: "STRING",
        description: "Working directory inside sandbox, defaults to sandbox/"
      }
    },
    required: ["command"]
  }
};

const initNodeProject = {
  type: "function",
  name: "init_node_project",
  description: "run npm init -y on sandbox folder",
  parameters: {
    type: "OBJECT",
    properties: {
    },
    required: []
  }
};

const installPackageTool = {
  type: "function",
  name: "install_package",
  description: "Install npm packages inside sandbox project using pnpm",
  parameters: {
    type: "OBJECT",
    properties: {
      packageName: {
        type: "STRING"
      }
    },
    required: ["packageName"]
  }
};

function execFunctions(toolName, args) {
  switch (toolName) {
    case "install_package":
      return bashCommandCallTool(`pnpm i ${args.packageName}`, '')
    case "init_node_project":
      return bashCommandCallTool('npm init -y', '')
    case "run_bash":
      return bashCommandCallTool(args.command, args.cwd || '')
    case "delete_file":
      fs.unlinkSync(sandboxPath(args.filePath))
      return `Deleted ${args.filePath}`
    case "create_folder":
      fs.mkdirSync(
        sandboxPath(args.folderPath)
        , { recursive: true }
      );
      return `Created folder ${args.folderPath}`
    case "write_file":
      return WriteFileFunction(args.filePath, args.content);
    case "read_file":
      return fs.readFileSync(
        sandboxPath(args.filePath),
        "utf-8"
      );
    case "read_directory":
      return ReadDirectoryFunction(args.folderPath);
    default:
      return "no a tool call" + toolName
  }
}

app.post('/', async (req, res) => {
  const prompt = req.body.prompt

  //gemini prompt for tasks
  const interaction = await client.interactions.create({
    model: 'gemini-2.5-flash',
    input: prompt,
    tools: [readDirectoryTool, readFileTool, writeFileTool, createFolderTool, deleteFileTool, runBashTool, initNodeProject, installPackageTool],
    generation_config: { tool_choice: 'any' }
  });

  console.log(prompt)

  for (const step of interaction.steps) {
    if (step.type === 'function_call') {
      console.log(`Function to call: ${step.name}`);
      console.log(`Arguments: ${JSON.stringify(step.arguments)}`);
    }
    console.log('step:', step)
  }

  // loop 
  // check if tasks are complete

  // end when complete else continue and tell it that the website should be hosted at 
  //http://localhost:5170/

  //return message for user 


  res.status(200).json({
    message: 'Hello World!',
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});   
