
export interface digitalCardDTO {
    userId: number;
    cardName: string; // The name of the card
    occupation: string; // Occupation of the user
    description: string; // Description or bio for the card
    profileImage?: string; // URL for the uploaded profile image
    coverImage?: string; // URL for the uploaded cover image
    customUrlName?: string; // Custom URL name for the card
    calendlyLink?: string; // Optional Calendly scheduling link
    status: 'active' | 'inactive'; // Status of the card
    videoUrl?: string; // URL of an associated video
    videoTitle?: string; // Title of the associated video
    momo?: string; // MoMo payment number or code
    wiseUrl?: string; // Wise (transfer) payment URL
    flutterwaveUrl?: string; // Flutterwave payment URL
  }
