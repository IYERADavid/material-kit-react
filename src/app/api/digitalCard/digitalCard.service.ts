import { digitalCardDTO } from "./digitalCard.dto";
import * as digitalCardModel from './digitalCard.model'

export async function createDigitalCard(digitalCardData: digitalCardDTO) {
    return digitalCardModel.createDigitalCard(digitalCardData);
}

export async function getDigitalCards(userId: number) {
    return digitalCardModel.getDigitalCards(userId);
}

export async function getDigitalCard(userId: number, cardId: number) {
    return digitalCardModel.getDigitalCard(userId, cardId);
}

export async function updateDigitatCard(digitalCardData: any) {
    return digitalCardModel.updateDigitatCard(digitalCardData);
}