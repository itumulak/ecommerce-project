export interface StripeCheckoutSession {
    id: string;
    payment_status: string;
    amount_total: number;
    currency: string;
    metadata: {
      userId: string;
    };
    display_items: Array<any>; // Adjust type based on the structure of your items
  }