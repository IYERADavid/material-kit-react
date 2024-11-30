import { NextResponse } from "next/server";
import multer from 'multer';
import formidable from 'formidable';
import { digitalCardDTO } from "./digitalCard.dto";
import * as DigitalCardService from "./digitalCard.service";

const upload = multer({ dest: '/tmp/uploads/' }); // Use /tmp as a writable directory

export async function createDigitalCard(req: any, res:any) {
    try {
        const digitalCardData: digitalCardDTO = await req.json();
        const digitalCard = await DigitalCardService.createDigitalCard(digitalCardData);
        return NextResponse.json(digitalCard, { status: 201 });
    } catch (error) {
      if (error instanceof Error) {
          return NextResponse.json({ message: 'Error creating digital Card', error: error.message }, { status: 500 });
      } else {
          return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
      }
    }
  }

export async function getDigitalCards(userId: number) {
    try {
        const digitalCards = await DigitalCardService.getDigitalCards(userId);
        return NextResponse.json(digitalCards, { status: 201 });
      } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Error getting digital Card', error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
        }
      }
}

export async function getDigitalCard(userId: number, cardId:number) {
    try {
        const digitalCard = await DigitalCardService.getDigitalCard(userId, cardId);
        return NextResponse.json(digitalCard, { status: 201 });
      } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Error getting digital Card', error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
        }
      }
}

export async function updateDigitalCard(digitalCardData: any) {
    try {
        const updateDigitalCard = await DigitalCardService.updateDigitalCard(digitalCardData);
        if (!updateDigitalCard) {
          return NextResponse.json({ message: 'digital Card Data not found' }, { status: 404 });
        }
        return NextResponse.json(updateDigitalCard, { status: 201 });
      } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Error updating digital Card Data', error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
        }
      }
}