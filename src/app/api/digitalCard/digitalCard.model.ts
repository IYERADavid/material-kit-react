import { randomUUID } from 'crypto';
import { db } from '../../../config/db';
import mysql, { RowDataPacket } from 'mysql2/promise';
import { digitalCardDTO } from './digitalCard.dto';

export async function createDigitalCard (digitalCardData: digitalCardDTO) {
    const token = randomUUID();
    console.log(digitalCardData.profileImage);
    

    try {
        
        const [result] = await db.execute(
            `
            INSERT INTO digital_cards (
            user_id,
            token,
            card_name,
            occupation,
            description,
            profile_image_url,
            cover_image_url,
            custom_url_name,
            calendly_link,
            status,
            video_url,
            video_title,
            momo_number_or_code,
            wise_url,
            flutterwave_url
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
            digitalCardData.userId,
            token,
            digitalCardData.cardName,
            digitalCardData.occupation,
            digitalCardData.description, 
            digitalCardData.profileImage,
            digitalCardData.coverImage,
            digitalCardData.customUrlName,
            digitalCardData.calendlyLink,
            digitalCardData.status,
            digitalCardData.videoUrl,
            digitalCardData.videoTitle,
            digitalCardData.momo,
            digitalCardData.wiseUrl,
            digitalCardData.flutterwaveUrl,
            ]
        );
      
        return { id: (result as mysql.ResultSetHeader).insertId, cardName: digitalCardData.cardName };
    } catch (error: any) {
        console.error("Error saving digital card:", {
          message: error.message,
          stack: error.stack,
          query: error.sql,
          params: digitalCardData,
        })
    };
}

export async function  getDigitalCards(userId: number) {
    try {
        const [digitalCards] = await db.execute("SELECT * FROM digital_cards WHERE user_id = ? ORDER BY timestamp DESC", [userId]);
        return (digitalCards as mysql.RowDataPacket[]);
    } catch (error: any) {
        console.error("Error getting digital cards:", {
            message: error.message,
            stack: error.stack,
            query: error.sql,
            params: userId,
          })
    }
}


export async function  getDigitalCard(userId: number, cardId: number) {
    try {
        const digitalCard = await db.execute("SELECT * FROM digital_cards WHERE user_id = ? AND id = ? ORDER BY timestamp DESC LIMIT 1", [userId, cardId]);
        return (digitalCard[0] as mysql.RowDataPacket[]);
    } catch (error: any) {
        console.error("Error getting digital card:", {
            message: error.message,
            stack: error.stack,
            query: error.sql,
            params: userId,
          })
    }
}

export async function updateDigitalCard(digitalCardData: any) {
    try {
        const digitalCard = await db.execute(
            `
            UPDATE digital_cards
            SET
                card_name = ?, occupation = ?, description = ?, profile_image_url = ?, 
                cover_image_url = ?, custom_url_name = ?, calendly_link = ?, status = ?, 
                video_url = ?, video_title = ?, momo_number_or_code = ?, wise_url = ?, flutterwave_url = ?
            WHERE user_id = ? AND id = ?
            RETURNING *
            `,
            [
                digitalCardData.cardName,
                digitalCardData.occupation,
                digitalCardData.description,
                digitalCardData.profileImage,
                digitalCardData.coverImage,
                digitalCardData.customUrlName,
                digitalCardData.calendlyLink,
                digitalCardData.status,
                digitalCardData.videoUrl,
                digitalCardData.videoTitle,
                digitalCardData.momo,
                digitalCardData.wiseUrl,
                digitalCardData.flutterwaveUrl,
                digitalCardData.userId,
                digitalCardData.cardId,
            ]
        );
    
        return (digitalCard[0] as mysql.RowDataPacket[]);
    } catch (error: any) {
        console.error("Error updating digital card:", {
            message: error.message,
            stack: error.stack,
            query: error.sql,
            params: digitalCardData,
          })
    }
}
