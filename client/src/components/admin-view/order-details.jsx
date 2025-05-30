import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";

const initialFormData ={
    status : ''
}

const AdminOrderDetailsView = () => {

    const [formData, setFormData] = useState(initialFormData)

    function handleUpdateStatus(event){
        event.preventDefault();
    }
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order Id</p>
            <Label>123</Label>
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order Date</p>
            <Label>1234</Label>
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Price</p>
            <Label>$123</Label>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Staus</p>
            <Label>In process</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>100</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>john</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone No.</span>
              <span>Notes</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "status",
                name: "Status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShiping", label: "In Shiping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={'Update Order Status'}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
