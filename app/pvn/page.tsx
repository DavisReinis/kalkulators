"use client"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";

const formSchema = z.object({
  cena: z.string({
    required_error: "Ievadiet preces cenu"
  })
    .regex(/^\d+([.,]\d{1,2})?$/, "Ievadiet pozitīvu skaitli, 0 vai 0.00 formā"),
  pvn: z.string({
    required_error: "Ievadiet preces pvn"
  })
    .regex(/^\d+$/, "Ievadiet vesalu skaitli"),
  cenaArPVNInput: z.string()
    .regex(/^\d+([.,]\d{1,2})?$/, "Ievadiet pozitīvu skaitli, 0 vai 0.00 formā"),
  pvn2: z.string({})
    .regex(/^\d+$/, "Ievadiet vesalu skaitli")
})
export default function Page(){
  const [res, setRes] = useState<{cenaArPVN:string, pvn:string, cena:string, pvnProcenti:string}|null>(null)
  const [res1, setRes1] = useState<{cenaArPVN:string, pvn:string, cenaBezPVN:string, procenti:string}|null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cena: "0",
      pvn: "21",
      cenaArPVNInput: "0",
      pvn2: "21",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>){
    const pvn = parseFloat(data.cena) * parseFloat(data.pvn) / 100;
    const cenaArPVN = (parseFloat(data.cena)+pvn)
    setRes({cenaArPVN:cenaArPVN.toFixed(2), pvnProcenti:data.pvn.toString(), cena:parseFloat(data.cena).toFixed(2), pvn:pvn.toFixed(2)})
  }

  const handleInputPress = (e:any) => {
    e.target.setSelectionRange(0, e.target.value.length);
  }

  function onSubmit1(data: z.infer<typeof formSchema>){
    const cenaBezPVN = parseFloat(data.cenaArPVNInput) * 100 / (parseInt(data.pvn2)+100)
    const pvn = parseFloat(data.cenaArPVNInput) -cenaBezPVN
    setRes1({cenaArPVN:parseFloat(data.cenaArPVNInput).toFixed(2), cenaBezPVN:cenaBezPVN.toFixed(2), pvn:pvn.toFixed(2), procenti:data.pvn2})
  }

  return (
    <div>
      <div className={"grid md:grid-cols-2 lg:grid-cols-3 gap-8"}>
        <Card>
          <CardHeader>
            <CardTitle>PVN Kalkulators</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
                <FormField
                  control={form.control}
                  name="cena"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Preces cena bez PVN, EUR</FormLabel>
                      <FormControl>
                        <Input onClick={handleInputPress} placeholder="Preces cena" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pvn"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>PVN %</FormLabel>
                      <FormControl>
                        <Input onClick={handleInputPress} placeholder="pvn" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button variant={"default"} type="submit" className={"mt-6"}>Aprēķināt</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rezultāti:</CardTitle>
          </CardHeader>
          <CardContent>
            {!res ? (
              <p>Spied aprēķināt lai redzētu rezultātu</p>
            ) : (
              <div>
                <div className={"row"}>
                  <p>PVN:</p>
                  <p>{res.pvn} EUR</p>
                </div>
                <div className={"row"}>
                  <p>Preces cena ar PVN:</p>
                  <p>{res.cenaArPVN} EUR</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Aprēķins:</CardTitle>
          </CardHeader>
          <CardContent>
            {!res ? (
              <p>Vispirms veiciet aprēķinu</p>
            ) : (
              <div className={"space-y-3"}>
                <div>
                  <p>Pievienotās Vērtības Nodoklis</p>
                  <p><strong>PVN = {res.cena} * {parseInt(res.pvnProcenti) / 100} = {res.pvn} EUR</strong></p>
                </div>
                <div>
                  <p>Preces cena ar PVN:</p>
                  <p><strong>Pilnā cena = {res.pvn} + {res.cena} = {res.cenaArPVN} EUR</strong></p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>PVN Kalkulators</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit1)} className={"space-y-4"}>
                <FormField
                  control={form.control}
                  name="cenaArPVNInput"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Preces cena ar PVN, EUR</FormLabel>
                      <FormControl>
                        <Input onClick={handleInputPress} placeholder="Preces cena" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pvn2"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>PVN %</FormLabel>
                      <FormControl>
                        <Input onClick={handleInputPress} placeholder="pvn" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button variant={"default"} type="submit" className={"mt-6"}>Aprēķināt</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rezultāti:</CardTitle>
          </CardHeader>
          <CardContent>
            {!res1 ? (
              <p>Spied aprēķināt lai redzētu rezultātu</p>
            ) : (
              <div>
                <div className={"row"}>
                  <p>PVN:</p>
                  <p>{res1.pvn} EUR</p>
                </div>
                <div className={"row"}>
                  <p>Preces cena bez PVN:</p>
                  <p>{res1.cenaBezPVN} EUR</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Aprēķins:</CardTitle>
          </CardHeader>
          <CardContent>
            {!res1 ? (
              <p>Vispirms veiciet aprēķinu</p>
            ) : (
              <div className={"space-y-3"}>
                <div>
                  <p>Preces cena bez PVN</p>
                  <p><strong>Cena bez PVN = {res1.cenaArPVN} * 100% / (100% + {res1.procenti}%)  = {res1.cenaBezPVN} EUR</strong></p>
                </div>
                <div>
                  <p>Pievienotās Vērtības Nodoklis:</p>
                  <p><strong>PVN = {res1.cenaArPVN} - {res1.cenaBezPVN} = {res1.pvn} EUR</strong></p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}