import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube, CheckCircle, Loader2 } from "lucide-react";

export default function ContactSection() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      form.reset();
      setShowSuccessModal(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-animate>
          <h2 className="text-4xl font-poppins font-bold mb-4 text-dark-charcoal">
            Get In <span className="text-construction-orange">Touch</span>
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your construction project? Contact us today for a free consultation and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div data-animate>
            <h3 className="text-2xl font-poppins font-bold mb-6 text-dark-charcoal">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-construction-orange text-white p-3 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-charcoal">Address</h4>
                  <p className="text-gray-600">123 Construction Ave, Builder City, BC 12345</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-construction-orange text-white p-3 rounded-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-charcoal">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-construction-orange text-white p-3 rounded-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-charcoal">Email</h4>
                  <p className="text-gray-600">info@estarra.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-construction-orange text-white p-3 rounded-lg">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-charcoal">Business Hours</h4>
                  <p className="text-gray-600">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sat: 9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-dark-charcoal mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="hover:bg-construction-orange hover:text-white">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-construction-orange hover:text-white">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-construction-orange hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-construction-orange hover:text-white">
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div data-animate>
            <h3 className="text-2xl font-poppins font-bold mb-6 text-dark-charcoal">Send Message</h3>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-dark-charcoal">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="mt-2 focus:ring-construction-orange focus:border-construction-orange"
                    {...form.register("name")}
                    data-testid="input-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="text-dark-charcoal">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-2 focus:ring-construction-orange focus:border-construction-orange"
                    {...form.register("email")}
                    data-testid="input-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-dark-charcoal">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="mt-2 focus:ring-construction-orange focus:border-construction-orange"
                  {...form.register("phone")}
                  data-testid="input-phone"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-dark-charcoal">Project Details *</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="mt-2 focus:ring-construction-orange focus:border-construction-orange resize-none"
                  {...form.register("message")}
                  data-testid="input-message"
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-construction-orange hover:bg-orange-600 text-white py-4 font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={contactMutation.isPending}
                data-testid="button-submit"
              >
                {contactMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" data-testid="success-modal">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center animate-slide-up">
            <div className="text-construction-orange text-5xl mb-4">
              <CheckCircle className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-dark-charcoal mb-4">Message Sent!</h3>
            <p className="text-gray-600 mb-6">Thank you for your interest. We'll get back to you within 24 hours.</p>
            <Button 
              onClick={closeSuccessModal}
              className="bg-construction-orange hover:bg-orange-600 text-white px-6 py-2 transition-all duration-300"
              data-testid="button-close-modal"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
