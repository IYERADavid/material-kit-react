import { createDigitalCard, getDigitalCard, getDigitalCards, updateDigitalCard } from "./digitalCard.controller";

export async function POST(request: any, res: any) {
    console.log(request);
    return await createDigitalCard(request, res);
}

export  async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const cardId = searchParams.get('cardId');
    const userId = searchParams.get('userId');
    
    if (cardId && userId) {
        return await getDigitalCard(parseInt(userId), parseInt(cardId));
    } else if(userId && !isNaN(Number(userId))) {
        return await getDigitalCards(parseInt(userId));
    }
 
}

export async function PUT(request: Request) {
    const body = await request.json();
    return await updateDigitalCard(body);
}