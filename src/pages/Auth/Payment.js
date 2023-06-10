import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { CreditCardIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Payment() {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const handlePayment = (e) => {
    e.preventDefault();
    const form = e.target;
    const card_number = form.card_number.value;
    const expries = form.expries.value;
    const cvc = form.cvc.value;
    const holder_name = form.holder_name.value;
    if (
      card_number.length !== 19 ||
      expries.length !== 5 ||
      cvc.length !== 4 ||
      holder_name === ""
    ) {
      setErr("Provide valid information");
    } else {
      navigate("/");
      toast.success("Registration Successfull!");
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center">
      <Card className="p-8">
        <form className="mt-12 flex flex-col gap-4" onSubmit={handlePayment}>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-xl text-[#463BFB]"
            >
              Please pay 400 RMB for Member Registration
            </Typography>
          </div>

          <div>
            <Input
              label="Card Number"
              name="card_number"
              maxLength={19}
              icon={<CreditCardIcon className="h-5 w-5 text-blue-gray-300" />}
            />
            <div className="my-4 flex items-center gap-4">
              <Input
                label="Expires"
                name="expries"
                maxLength={5}
                containerProps={{ className: "min-w-[72px]" }}
              />
              <Input
                label="CVC"
                name="cvc"
                maxLength={4}
                containerProps={{ className: "min-w-[72px]" }}
              />
            </div>
            <Input label="Holder Name" name="holder_name" />
          </div>
          {err && <p className="text-red-500">{err}</p>}
          <Button size="lg" type="submit" className="bg-[#463BFB]">
            Pay Now
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
          >
            <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are secure
            and encrypted
          </Typography>
        </form>
      </Card>
    </section>
  );
}
