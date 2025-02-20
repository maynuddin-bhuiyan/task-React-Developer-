"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { useState } from "react"

type FormStep = 1 | 2 | 3 | 4 | 5

interface FormData {
  isHomeOwner: string
  monthlyBill: string
  creditScore: string
  name: string
  address: string
  city: string
  zipCode: string
  unit: string
  phone: string
  callTime: string
}

export default function SolarForm() {
  const [step, setStep] = useState<FormStep>(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    isHomeOwner: "",
    monthlyBill: "",
    creditScore: "",
    name: "",
    address: "",
    city: "",
    zipCode: "",
    unit: "",
    phone: "",
    callTime: "",
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 5 && isStepValid(step)) {
      setStep((prev) => (prev + 1) as FormStep)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as FormStep)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isStepValid(5)) {
      console.log("Form submitted:", formData)
      setIsSubmitted(true)
    }
  }

  const handleBackToHome = () => {
    setIsSubmitted(false)
    setStep(1)
    setFormData({
      isHomeOwner: "",
      monthlyBill: "",
      creditScore: "",
      name: "",
      address: "",
      city: "",
      zipCode: "",
      unit: "",
      phone: "",
      callTime: "",
    })
  }

  const isStepValid = (currentStep: FormStep): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.isHomeOwner
      case 2:
        return !!formData.monthlyBill
      case 3:
        return !!formData.creditScore
      case 4:
        return !!(formData.name && formData.address && formData.city && formData.zipCode)
      case 5:
        return !!(formData.phone && formData.callTime)
      default:
        return false
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full lg:w-lg p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg text-center mt-5 lg:mt-0">
        <h1 className="text-3xl font-semibold mb-8">Thank you for your response</h1>
        <div className="space-y-6">
          <div className="text-xl">
            {"You're about to save estimated"}
            <div className="font-bold text-2xl mt-2">18,000 USD.</div>
          </div>
          <p className="text-gray-600">{"We'll contact with you soon with proper credentials."}</p>
          <Button onClick={handleBackToHome} className="mt-8 px-8 lg:w-[280px] rounded-full">
            Back To Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg p-6 bg-white rounded-3xl">
      <h1 className="text-2xl font-semibold mb-6">Complete the steps to unlock your solar potential</h1>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 h-[2px] w-full bg-gray-200 -z-10" />
        {[1, 2, 3, 4, 5].map((number) => (
          <div key={number} className="flex flex-col items-center z-0">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1",
                step === number
                  ? "bg-blue-500 text-white border-2 border-blue-500"
                  : number < step
                    ? "bg-blue-500 text-white"
                    : "bg-white border-2 border-gray-300 text-gray-500",
              )}
            >
              {number}
            </div>
            <span className="text-xs text-gray-600">{number === 5 ? "Last Page" : "Next"}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <Label className="lg:text-xl font-semibold">Are you a home owner? *</Label>
            <RadioGroup value={formData.isHomeOwner} onValueChange={(value) => updateFormData("isHomeOwner", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="homeowner-yes" />
                <Label htmlFor="homeowner-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="homeowner-no" />
                <Label htmlFor="homeowner-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Label className="lg:text-xl font-semibold">Is your monthly electricity bills over $99? *</Label>
            <RadioGroup value={formData.monthlyBill} onValueChange={(value) => updateFormData("monthlyBill", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="bill-yes" />
                <Label htmlFor="bill-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="bill-no" />
                <Label htmlFor="bill-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Label className="lg:text-xl font-semibold">Your estimated credit score? *</Label>
            <RadioGroup value={formData.creditScore} onValueChange={(value) => updateFormData("creditScore", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excellent" id="score-excellent" />
                <Label htmlFor="score-excellent">More Than 740 ( Excellent )</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="score-good" />
                <Label htmlFor="score-good">680 - 739 ( Good )</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="poor" id="score-poor" />
                <Label htmlFor="score-poor">Less than 569 ( Poor )</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unsure" id="score-unsure" />
                <Label htmlFor="score-unsure">{"I'm"} not sure</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <Label className="lg:text-xl font-semibold" htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label className="lg:text-xl font-semibold" htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                className="mt-1"
                required
              />
              <Input
                value={formData.city}
                onChange={(e) => updateFormData("city", e.target.value)}
                placeholder="City"
                className="mt-2"
                required
              />
              <Input
                value={formData.zipCode}
                onChange={(e) => updateFormData("zipCode", e.target.value)}
                placeholder="ZIP Code"
                className="mt-2"
                required
              />
              <Input
                value={formData.unit}
                onChange={(e) => updateFormData("unit", e.target.value)}
                placeholder="Unit (optional)"
                className="mt-2"
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="lg:text-xl font-semibold">One last thing...</h2>
            <div>
              <Label className="lg:text-xl font-semibold" htmlFor="phone">Contact *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label className="lg:text-xl font-semibold">Preferred time of calling? *</Label>
              <RadioGroup value={formData.callTime} onValueChange={(value) => updateFormData("callTime", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="morning" id="time-morning" />
                  <Label htmlFor="time-morning">9 AM - 11 AM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="evening" id="time-evening" />
                  <Label htmlFor="time-evening">6 PM - 8 PM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="anytime" id="time-anytime" />
                  <Label htmlFor="time-anytime">{"I'm"} available to pick anytime</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}


        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button className="lg:w-20" type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 5 ? (
            <Button
              type="button"
              onClick={handleNext}
              className={cn("ml-auto w-[160px] lg:w-[200px] xl:w-[280px] rounded-full", !isStepValid(step) && "opacity-50 cursor-not-allowed")}
              disabled={!isStepValid(step)}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className={cn("ml-auto lg:w-[280px] rounded-full", !isStepValid(5) && "opacity-50 cursor-not-allowed")}
              disabled={!isStepValid(5)}
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

