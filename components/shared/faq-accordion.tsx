import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { type FAQItem } from '@/lib/tools-config';

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="border-b border-subtle"
        >
          <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-primary transition-colors py-5">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-secondary-muted leading-relaxed pb-5">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
