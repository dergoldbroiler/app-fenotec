import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Datastore } from '@/app/types/datastore';


/* Fetching a single entry and write it back as locked */
export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id');

  const dataFilePath = path.join(process.cwd(), '/app/datastore.json');
  const jsonData = readFileSync(dataFilePath, 'utf8');

  const jsonDataWithLock = JSON.parse(jsonData).map((entry: Datastore) => {
    if (entry.id === id) {
      entry.locked = true;
    }
    return entry;
  });


  const written = writeFileSync(dataFilePath, JSON.stringify(jsonDataWithLock), 'utf8');

  let data = jsonDataWithLock;

  const dataset = data.find((entry: Datastore | any) => entry.id === id);

 
return new Response(JSON.stringify(dataset)); }