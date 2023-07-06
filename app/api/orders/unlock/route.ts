import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Datastore } from '@/app/types/datastore';


/* Fetching a single entry and write it back as locked */
export async function GET(request: Request) {

  const dataFilePath = path.join(process.cwd(), '/app/datastore.json');
  const jsonData = readFileSync(dataFilePath, 'utf8');

  const jsonDataWithoutLock = JSON.parse(jsonData).map((entry: Datastore) => {
    entry.locked = false;
    return entry;
  });


  const written = writeFileSync(dataFilePath, JSON.stringify(jsonDataWithoutLock), 'utf8');
  


 
return new Response(JSON.stringify(jsonDataWithoutLock)); }