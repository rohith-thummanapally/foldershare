import e from 'express';
import cors from 'cors';
import { folderrouter } from './src/features/folderApis/folder.router.js';
import { fileRouter } from './src/features/fileApis/file.router.js';
const app=e();
//app.use(cors());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(e.json());
app.use('/api/folder',folderrouter);
app.use('/api/file',fileRouter);
export default app;