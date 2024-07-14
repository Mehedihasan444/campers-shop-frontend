import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "What is the return policy?",
      answer:
        "You can return any item within 30 days of delivery. Please see our full return policy for details.",
    },
    {
      id: 2,
      question: "How long does shipping take?",
      answer:
        "Shipping typically takes 3-7 business days within the continental US. Please allow extra time for international shipping.",
    },
    {
      id: 3,
      question: "Can I cancel my order?",
      answer:
        "Please contact us as soon as possible if you need to cancel your order. We will do our best to accommodate your request.",
    },
    {
      id: 4,
      question: "What forms of payment do you accept?",
      answer:
        "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover.",
    },
    {
      id: 5,
      question: "Is my personal and payment information secure?",
      answer:
        "Yes, our website uses industry-standard SSL encryption to ensure that your personal and payment information is secure.",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto sm:h-[70vh] px-5 lg:px-0">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">FAQ</h2>
      <div className="sm:flex justify-between sm:gap-5 ">
        <div className="flex-1">

        <Accordion type="single" collapsible className="">
          {faqs?.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger className="text-primary text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
      
        </Accordion>
        </div>
        <div className="flex-1 sm:flex items-center justify-center hidden ">
          <img
            src="https://i.ibb.co/3dCf7SF/FAQs-rafiki.png"
            alt=""
            className="h-[500px] object-cover -mt-20"
          />
        </div>
      </div>
    </div>
  );
};
export default FAQ;
