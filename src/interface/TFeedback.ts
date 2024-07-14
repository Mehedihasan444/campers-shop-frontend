export type TFeedback = {
  _id: string,
    productId:number,
    user_name:string,
    email:string,
      rating: {
        rating: number,
        total_rating: number,
      },
      feedback: string,
      feedback_description:string
      product: {
        image: string,
        name: string,
        product_purchased: string,
      },
      createdAt: string,
    };