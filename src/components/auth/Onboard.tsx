import React, {useState } from "react";
import { useOnboardMutation, OnboardRequest } from "../../api/issuer/issuerApi"; 
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useDispatch } from "react-redux";
import { setAuth } from "@/services/auth/authSlice";

export const Onboard = () => {
  const [formData, setFormData] = useState<OnboardRequest>({
    category: "COMPANY",
    companyName: "",
    CIN: undefined,
    instituteName: "",
    issuerName: "",
    designation: "",
    address: "",
  });
  const [selectedOption, setSelectedOption] = useState<string>("company"); 
  
  const [onboard, { isLoading, isError }] = useOnboardMutation();

  const dispatch=useDispatch()
  

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setFormData({
      ...formData,
      category: value === "company" ? "COMPANY" : value === "educational-institute" ? "INSTITUTE" : "INDIVIDUAL",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleCINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      CIN: value ? parseInt(value) : undefined,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData)
    try {
      await onboard(formData);
      dispatch(setAuth({authStatus:"ONBOARDED"}))
    } catch (error) {
      console.error("Error onboarding:", error);
  
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-start gap-4">
          <div className="text-gray-500 dark:text-gray-400">You are registered as?</div>
          <Select value={selectedOption} onValueChange={handleOptionChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="educational-institute">Educational Institute</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="issuerName">Your Name</Label>
            <Input id="issuerName" placeholder="Enter your name" value={formData.issuerName} onChange={handleInputChange} />
          </div>
          {selectedOption === "company" && (
            <>
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" placeholder="Enter your company name" value={formData.companyName} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="CIN">CIN Number</Label>
                <Input id="CIN" placeholder="Enter your CIN number" type="number" value={formData.CIN ?? ""} onChange={handleCINChange} />
              </div>
            </>
          )}
          {selectedOption === "educational-institute" && (
            <div>
              <Label htmlFor="instituteName">Institute Name</Label>
              <Input id="instituteName" placeholder="Enter your institute name" value={formData.instituteName} onChange={handleInputChange} />
            </div>
          )}
          <div>
            <Label htmlFor="designation">Your Designation</Label>
            <Input id="designation" placeholder="Enter your designation" value={formData.designation} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="Enter your address" value={formData.address} onChange={handleInputChange} />
          </div>
          <Button type="submit" disabled={isLoading}>Submit</Button>
          {isError && <p className="text-red-500">{isError?("Failed to onboard."):""}</p>}
        </form>
      </div>
    </div>
  );
};
