import app from './app';
import { port } from './config';

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});