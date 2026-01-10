import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";

export default function ContactForm({
  get,
  handleSubmit,
  handleInputChange,
  formData,
  isLoading,
  serviceOptions,
  budgetOptions,
  timelineOptions,
  pricePlaceholders,
  priceHelperText,
  currentLanguage,
  sendBtn,
}: any) {
  return (
    <div className="lg:col-span-2">
      <Card className="bg-white/70 border-green-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">
            {get(["form", "title"], "Project Details")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label={get(["form", "ariaLabel"], "Project details form")}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  {get(["form", "nameLabel"], "Full Name *")}
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-green-200 focus:border-green-500 w-full"
                  placeholder={get(["form", "namePlaceholder"], "John Doe")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  {get(["form", "emailLabel"], "Email Address *")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-green-200 focus:border-green-500 w-full"
                  placeholder={get(
                    ["form", "emailPlaceholder"],
                    "john@example.com"
                  )}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">
                  {get(["form", "phoneLabel"], "Phone Number")}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="border-green-200 focus:border-green-500 w-full"
                  placeholder={get(
                    ["form", "phonePlaceholder"],
                    "+1 (555) 123-4567"
                  )}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service" className="text-gray-700">
                  {get(["form", "serviceLabel"], "Service Needed *")}
                </Label>
                <Select
                  required
                  onValueChange={(value) => handleInputChange("service", value)}
                >
                  <SelectTrigger className="border-green-200 focus:border-green-500 w-full">
                    <SelectValue
                      placeholder={get(
                        ["form", "servicePlaceholder"],
                        "Select a service"
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((o: any) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-gray-700">
                  {get(["form", "budgetLabel"], "Property Type")}
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger className="border-green-200 focus:border-green-500 w-full">
                    <SelectValue
                      placeholder={get(
                        ["form", "budgetPlaceholder"],
                        "Select property type"
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOptions.map((b: any) => (
                      <SelectItem key={b.value} value={b.value}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {(formData.service === "buying" ||
                formData.service === "renting") && (
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-700">
                    {
                      get(["form", "priceLabel"], {
                        en: "Price Range (zł)",
                        ua: "Діапазон цін (zł)",
                        pl: "Zakres cenowy (zł)",
                      })[currentLanguage.code]
                    }
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="price"
                      type="text"
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      className="border-green-200 focus:border-green-500 w-full"
                      placeholder={
                        pricePlaceholders[currentLanguage.code][
                          formData.service
                        ]
                      }
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {priceHelperText[currentLanguage.code][formData.service]}
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-gray-700">
                  {get(["form", "timelineLabel"], "Project Timeline")}
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("timeline", value)
                  }
                >
                  <SelectTrigger className="border-green-200 focus:border-green-500 w-full">
                    <SelectValue
                      placeholder={get(
                        ["form", "timelinePlaceholder"],
                        "When do you need this completed?"
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map((t: any) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-700">
                {get(["form", "messageLabel"], "Project Description *")}
              </Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="border-green-200 focus:border-green-500 w-full min-h-[120px]"
                placeholder={get(
                  ["form", "messagePlaceholder"],
                  "Tell us about your project, goals, and any specific requirements..."
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {get(["form", "submittingText"], "Submitting...")}
                </>
              ) : (
                <>
                  {sendBtn} <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
