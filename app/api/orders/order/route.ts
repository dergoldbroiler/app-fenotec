import { getEntry } from '../../../services/datahandler';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id');

  const data = getEntry(1);
return new Response(JSON.stringify(data)); }