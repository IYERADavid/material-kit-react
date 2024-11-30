import axios from "axios";

export interface digitalCardInterface {
    userId: number;
    cardName: string; // The name of the card
    occupation: string; // Occupation of the user
    description: string; // Description or bio for the card
    profileImageUrl?: string; // URL for the uploaded profile image
    coverImageUrl?: string; // URL for the uploaded cover image
    customUrlName?: string; // Custom URL name for the card
    calendlyLink?: string; // Optional Calendly scheduling link
    status: 'active' | 'inactive'; // Status of the card
    videoUrl?: string; // URL of an associated video
    videoTitle?: string; // Title of the associated video
    momoNumberOrCode?: string; // MoMo payment number or code
    wiseUrl?: string; // Wise (transfer) payment URL
    flutterwaveUrl?: string; // Flutterwave payment URL
}

class  DigitalCardClient {
    async createDigitalCard(digitalCardData: any){
        let response;
        try {
            response = await axios.post('/api/digitalCard', digitalCardData);
        } catch (error) {
            
        }
        return response?.data || null;
    }

    async getDIgitalCards(userId: number) {
        let response;
        try {
            response = await axios.get('/api/digitalCard', {
                params: { userId: userId }
            })
        } catch (error) {
            
        }
        return response?.data;
    }

    async getDigitalCardById(userId:number, id:number){
        let response;
        try {
            response = await axios.get('/api/digitalCard', {
                params: { userId: userId, cardId: id }
            })
        } catch (error) {
            
        }
        return response?.data[0];
    }

    async updateDigitalCard(digitalCardData: any) {
        let response;
        try {
            response = await axios.put('/api/digitalCard', digitalCardData)
        } catch (error) {
            
        }
        return response?.data;
    }
}

export const digitalCardClient = new DigitalCardClient();