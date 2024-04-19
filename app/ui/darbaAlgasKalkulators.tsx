"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {Checkbox} from "@/components/checkbox";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ieraksti, rezultati} from "@/app/definitions";
import Modal from "@/app/ui/modal";


const formSchema = z.object({
  brutoAlga: z.string({
    required_error: "Ievadiet darbu neto algu" })
    .regex(/^\d+([.,]\d{1,2})?$/, "Ievadiet skaitli, formātā: 0 vai 0.00, izmantot tikai pozitīvas vērtības"),

  apgadajamie: z.string({
    required_error: "Ievadiet apgadajamo skaitu" })
    .regex(/^\d+$/, "Ievadiet vesalu skaitli"),

  irnodoklugramatina: z.boolean(),

  neapliekamismin: z.string({
    required_error: "Ievadiet neapliekamo minumumu" })
    .regex(/^\d+([.,]\d{1,2})?$/, "Ievadiet skaitli, formātā: 0 vai 0.00, izmantot tikai pozitīvas vērtības"),

  papildusAtvieglojumi: z.string({
    required_error: "Ievadiet papildus atvieglojumus" })
    .regex(/^\d+([.,]\d{1,2})?$/, "Ievadiet skaitli, formātā: 0 vai 0.00, izmantot tiaki pozitīvas vērtības"),

})

export function DarbaAlgasKalkulators() {
  const [rezultati, setRezultati] = useState<rezultati | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [savedMessage, setSavedMessage] = useState<boolean>(false);
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false);

  const confirmAction = (id:number):void => {
    const data = getIeraksts(id)
     form.reset({
       brutoAlga: data.bruto.toString(),
       apgadajamie: data.apgadajamie.toString(),
       papildusAtvieglojumi: data.papildusAtvieglojumi.toString(),
       neapliekamismin: data.neapliekamaisMinimums.toString(),
       irnodoklugramatina: data.irnodoklugramatina
     })
    onSubmit({brutoAlga: data.bruto, apgadajamie: data.apgadajamie, irnodoklugramatina: data.irnodoklugramatina, neapliekamismin: data.neapliekamaisMinimums, papildusAtvieglojumi: data.papildusAtvieglojumi})
    closeModal();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brutoAlga: "0",
      apgadajamie: "0",
      irnodoklugramatina: false,
      neapliekamismin: "0",
      papildusAtvieglojumi: "0",
    },
  })

  function getIeraksts(id:number){
    const data = JSON.parse(localStorage.getItem("aprekinuIeraksti")||"[]");
    console.log(data)
    const res = data.find((x:ieraksti) => x.id === id);
    console.log(res)
    return res;
  }

  function handleSaveData(){
      if(rezultati){
        let id:number = JSON.parse(localStorage.getItem("lastId") || "0")
        const newData:ieraksti = {id:id, bruto: rezultati.bruto, apgadajamie: rezultati.apgadajamie, irnodokluGramatina: rezultati.irnodoklugramatina, neapliekamaisMinimums:rezultati.neapliekamismin, papildusAtvieglojumi:rezultati.papildusstvieglojumi, neto:rezultati.neto, date:new Date()}
        let existingData: ieraksti[] = JSON.parse(localStorage.getItem("aprekinuIeraksti") || "[]");
        existingData.push(newData)
        localStorage.setItem("aprekinuIeraksti", JSON.stringify(existingData));
        id++;
        localStorage.setItem("lastId", JSON.stringify(id));
        setSavedMessage(true)
    }
  }

  const handleInputPress = (e:any) => {
    e.target.setSelectionRange(0, e.target.value.length);
  }

  let bruto, neto, darbaDevVSAOI, darbaDevIzdevumi, VSAOI, atvieglojumi, IINBaze:number;
  let IIN2:number = 0;
  let IIN1:number = 0;

  function onSubmit(values: z.infer<typeof formSchema>){
    setSavedMessage(false)
    bruto = parseFloat(values.brutoAlga);
    VSAOI = parseFloat(values.brutoAlga) * 0.105;
    atvieglojumi = VSAOI + parseFloat(values.apgadajamie)*250+parseFloat(values.neapliekamismin)+parseFloat(values.papildusAtvieglojumi)
    if(bruto > 1667){
      IINBaze = 1667 - atvieglojumi
    } else IINBaze = bruto - atvieglojumi
    if(values.irnodoklugramatina){
      if(IINBaze > 0) IIN1 = IINBaze / 5;//dala ar 5 nevis reizina ar 0.2 lai iegutu precīzāku rezultātu
      if(bruto > 1667) IIN2 = ( bruto - 1667 ) * 0.23;
    } else {
      IIN1 = bruto * 0.23 - VSAOI / 5;
    }
    neto = bruto - IIN1 - IIN2 - VSAOI;
    darbaDevVSAOI = bruto * 0.2359;
    darbaDevIzdevumi = bruto + darbaDevVSAOI
    setRezultati({neapliekamismin: parseFloat(values.neapliekamismin), bruto:bruto, papildusstvieglojumi:JSON.parse(values.papildusAtvieglojumi), irnodoklugramatina:values.irnodoklugramatina, apgadajamie:parseFloat(values.apgadajamie), VSAOI:VSAOI, IINBaze:IINBaze, IIN1:IIN1, IIN2:IIN2, darbaDevVSAOI:darbaDevVSAOI, neto:neto, darbaDevIzdevumi:darbaDevIzdevumi})
  }
  return (
    <div>
      <div className={"grid md:grid-cols-2 gap-4 lg:gap-6"}>
        <Card>
          <CardHeader>
            <CardTitle>
              Bruto uz Neto 2024. gadam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="brutoAlga"
                  render={({field}) => (
                    <FormItem>
                      <div className={"md:flex md:space-x-3 md:items-center"}>
                        <FormLabel>Bruto Mēnešalga EUR:</FormLabel>
                        <FormControl>
                          <Input onClick={handleInputPress} placeholder="Bruto Alga" {...field}/>
                        </FormControl>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apgadajamie"
                  render={({field}) => (
                    <FormItem>
                      <div className={"md:flex md:space-x-3 md:items-center"}>

                        <FormLabel>Apgādājamo Skaits EUR:</FormLabel>
                        <FormControl>
                          <Input onClick={handleInputPress} placeholder="Apgādājamo skaits" {...field}/>
                        </FormControl>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="irnodoklugramatina"
                  render={({field}) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormLabel>
                        Algas nodokļu grāmatiņa ir iesniegta darba devējam:
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className={"border-slate-400"}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="neapliekamismin"
                  render={({field}) => (
                    <FormItem>
                      <div className={"md:flex md:space-x-3 md:items-center"}>

                        <FormLabel>Mmēneša neapliekamais minimums, EUR:</FormLabel>
                        <FormControl>
                          <Input onClick={handleInputPress} placeholder="Neapliekamais minimums" {...field}/>
                        </FormControl>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="papildusAtvieglojumi"
                  render={({field}) => (
                    <FormItem>
                      <div className={"md:flex md:space-x-3 md:items-center"}>
                        <FormLabel>Papildus atvieglojumi EUR, mēnesī:</FormLabel>
                        <FormControl>
                          <Input onClick={handleInputPress} placeholder="Papildus atvieglojumi" {...field}/>
                        </FormControl>
                      </div>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <div className="flex flex-wrap space-x-4">
                  <Button type="submit">Aprēķināt</Button>
                </div>

              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              Rezultāti:
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!rezultati ? (
              <p>Lai redzētu rezultātus veiciet aprēķinu.</p>
            ) : rezultati?.irnodoklugramatina && rezultati?.bruto > 1667 ? (
              <div>
                <div className={"row font-bold border-b-2 border-b-black !border-t-0 text-xl"}>
                  <p>Neto alga:</p>
                  <p>{rezultati?.neto.toFixed(2)} EUR</p>
                </div>
                <div className={"row"}>
                  <p>Sociālais nodoklis jeb VSAOI:</p>
                  <p>{rezultati?.VSAOI.toFixed(2)} EUR</p>
                </div>
                <div className={"row"}>
                  <p>Iedzīvotāju ienākuma nodoklis ienākumam līdz 1667 EUR:</p>
                  <p>{rezultati?.IIN1.toFixed(2)} EUR</p>
                </div>
                <div className={"row"}>
                  <p>Iedzīvotāju ienākuma nodoklis ({rezultati.bruto-1667} EUR), daļai kas pārsniedz 1667 EUR:</p>
                  <p>{rezultati?.IIN2.toFixed(2)} EUR</p>
                </div>
                <div className={"row"}>
                  <p>VSAOI darba devējam:</p>
                  <p>{rezultati?.darbaDevVSAOI.toFixed(2)} EUR</p>
                </div>
                <div className={"row mb-6"}>
                  <p>Darba devēja izdevumi kopā:</p>
                  <p>{rezultati?.darbaDevIzdevumi.toFixed(2)} EUR</p>
                </div>
              </div>
            ) : (
              <div>
                <div className={"row font-bold border-b-2 border-b-black !border-t-0 text-xl"}>
                  <p>Neto alga:</p>
                  <p>{rezultati?.neto.toFixed(2)} EUR</p>
                </div>
                <div className={"row"}>
                  <p>Sociālais nodoklis jeb VSAOI:</p>
                  <p>{rezultati?.VSAOI.toFixed(2)} EUR</p>
                </div>
                <div className={"row"}>
                  <p>Iedzīvotāju ienākuma nodoklis:</p>
                  <p>{rezultati?.IIN1.toFixed(2)} EUR</p>
                </div>
                <div className={"row"}>
                  <p>VSAOI darba devējam:</p>
                  <p>{rezultati?.darbaDevVSAOI.toFixed(2)} EUR</p>
                </div>
                <div className={"row !border-b-0 pb-6"}>
                  <p>Darba devēja izdevumi kopā:</p>
                  <p>{rezultati?.darbaDevIzdevumi.toFixed(2)} EUR</p>
                </div>
              </div>
            )}
            {rezultati && (<Button variant={"default"} disabled={savedMessage} onClick={handleSaveData}>Saglabāt rezultātus</Button>)}
            {savedMessage && (<p className={"text-green-500"}>Rezultāts saglabāts</p>)}
          </CardContent>
        </Card>
      </div>
      <div className={"md:flex md:space-x-4 py-6"}>
        <h2 className={"text-2xl font-semibold"}>Ispējams apskatīties saglabātos rezultātus</h2>
        <Button variant={"default"} onClick={openModal}>Apskatīt saglabātos</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Aprēķini:</CardTitle>
        </CardHeader>
        <CardContent>
          {!rezultati ? (
            <p>Veiciet aprēķinus vispirms</p>
          ): (
            <div className={"space-y-3"}>
              <div>
                <p>VSAOI(Valsts Sociālās Apdrošināšanas Obligātā Iemaka) pamata likme ir 10.5%</p>
                <p><strong>1) VSAOI = {rezultati.bruto.toFixed(2)} * 0.105 = {rezultati.VSAOI.toFixed(2)}</strong></p>
              </div>
              {!rezultati.irnodoklugramatina ? (
                <div>
                  <p><strong>2) IIN = {rezultati.bruto.toFixed(2)} * 0.23 - {rezultati.VSAOI.toFixed(2)} * 0.2 = {rezultati.IIN1.toFixed(2)}</strong></p>
                </div>
              ): rezultati.bruto <= 1667 ? (
                <div>
                  <p>IIN bāze = {rezultati.bruto.toFixed(2)} - {rezultati.VSAOI.toFixed(2)} - {rezultati.apgadajamie} * 250 - {rezultati.neapliekamismin.toFixed(2)} - {rezultati.papildusstvieglojumi.toFixed(2)} = {rezultati.IINBaze>=0 ? (rezultati.IINBaze.toFixed(2)) : (0.00)}</p>
                  <p><strong>2) IIN = {rezultati.IINBaze>=0 ? (rezultati.IINBaze.toFixed(2)) : (0.00)} * 0.2 = {rezultati.IIN1}</strong></p>
                </div>
              ): (
                <div>
                  <p>IIN daļai, kas nepārsniedz 1667 EUR mēnesī ir 20%</p>
                  <p>IIN bāze = 1667 - {rezultati.VSAOI.toFixed()} - {rezultati.apgadajamie} * 250 - {rezultati.neapliekamismin} - {rezultati.papildusstvieglojumi} = {rezultati.IINBaze>=0 ? (rezultati.IINBaze.toFixed(2)) : (0.00)}</p>
                  <p><strong>IIN = {rezultati.IINBaze>=0 ? (rezultati.IINBaze.toFixed(2)) : (0.00)} * 0.2 = {rezultati.IIN1}</strong></p>
                  <p>IIN daļai, kas pārsniedz 1667 EUR mēnesī ({rezultati.bruto -1667} EUR) ir 23%</p>
                  <p><strong>INN = {rezultati.bruto -1667} * 0.23 = {rezultati.IIN2.toFixed(2)}</strong></p>
                  <p><strong>2) Kopā IIN = {rezultati.IIN1} + {rezultati.IIN2} = {(rezultati.IIN1 + rezultati.IIN2).toFixed(2)}</strong></p>
                </div>
              )}
              <div>
                <p><strong>3) Neto alga = {rezultati.bruto.toFixed(2)} - {(rezultati.IIN1 + rezultati.IIN2).toFixed(2)} - {rezultati.VSAOI.toFixed(2)} = {rezultati.neto.toFixed(2)}</strong></p>
              </div>
              <div>
                <p>Darba devēja VSAOI daļa 23.59% no bruto algas</p>
                <p><strong>4) Darba devēja VSAOI = {rezultati.bruto.toFixed(2)} * 0.2359 = {rezultati.neto.toFixed(2)}</strong></p>
              </div>
              <div>
                <p><strong>5) Darba devēja kopējās izmakas = {rezultati.bruto.toFixed(2)} + {rezultati.darbaDevVSAOI.toFixed(2)} = {rezultati.darbaDevIzdevumi.toFixed(2)}</strong></p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal setOpen={openModal} isOpen={isOpen} onClose={closeModal} onConfirm={confirmAction}/>
    </div>
  )
}
