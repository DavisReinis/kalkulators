"use client"

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
  procenti: z.string()
    .regex(/^\d+([.,]\d{1,2})?$/, "Ievadiet pozitīvu skaitli, formā 0 vai 0.00"),
  aiznemums: z.string({
    required_error: "Ievadiet preces pvn"
  })
    .regex(/^\d+([.,]\d{1,2})?$/, "Ievadiet pozitīvu skaitli, formā 0 vai 0.00"),
  periods: z.string({})
    .regex(/^\d+$/, "Ievadiet vesalu skaitli")
})

export default function Page(){
  const [res, setRes] = useState<{procenti:string, summa:string, parmaksa:string, menesamaksa:string, periods:string}>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      procenti: "7",
      aiznemums: "3000",
      periods: "24"
    },
  })

  const handleInputPress = (e:any) => {
    e.target.setSelectionRange(0, e.target.value.length);
  }

  function onsubmit(data: z.infer<typeof formSchema>){
    const summa = parseFloat(data.aiznemums) * (1 + parseFloat(data.procenti) / 100 * parseFloat(data.periods) / 12);
    const parmaksa = summa - parseFloat(data.aiznemums)
    const menesaMaksa = summa / parseFloat(data.periods)
    setRes({parmaksa:parmaksa.toFixed(2), procenti:data.procenti, menesamaksa:menesaMaksa.toFixed(2), periods:data.periods.toString(), summa:summa.toFixed(2)})
  }

  return (
    <div className={"grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"}>
      <Card>
        <CardHeader>
          <CardTitle>Veinkāršie Procenti</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className={"space-y-4"}>
              <FormField
                control={form.control}
                name="aiznemums"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Aizņēmuma apmērs, EUR</FormLabel>
                    <FormControl>
                      <Input onClick={handleInputPress} placeholder="3000.00" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="periods"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Atmaksas periods mēneši</FormLabel>
                    <FormControl>
                      <Input onClick={handleInputPress} placeholder="24" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="procenti"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Procentu likme % gadā</FormLabel>
                    <FormControl>
                      <Input onClick={handleInputPress} placeholder="procentu likme" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button variant={"default"} type={"submit"} className={"mt-6"}>Aprēķināt</Button>
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
            <p>Vispirsms veiciet aprēķinu</p>
          ) : (
            <div>
              <div className={"row"}>
                <p>Kopējā apmaksas summa: </p>
                <p>{res?.summa} EUR</p>
              </div>
              <div className={"row"}>
                <p>Kredita parmaksa:</p>
                <p>{res.parmaksa} EUR</p>
              </div>
              <div className={"row"}>
                <p>Mēneša maksa:</p>
                <p>{res.menesamaksa} EUR</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Aprēķins
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!res ? (
            <p>Vispirms veiciet aprēķinus</p>
          ): (
            <div className={"space-y-3"}>
              <div>
                <p>Kopējā atmaksāšanas summa</p>
                <p><strong>1) Summa = {(parseFloat(res.summa) - parseFloat(res.parmaksa)).toFixed(2)} * (100% + {res.procenti}% * {parseInt(res.periods)/12}) = {res.summa} EUR</strong></p>
              </div>
              <div>
                <p>Pārmaksa jeb maksa par kredītu</p>
                <p><strong>2) Parmaksa = {res.summa} - {(parseFloat(res.summa) - parseFloat(res.parmaksa)).toFixed(2)} = {res.parmaksa} EUR</strong></p>
              </div>
              <div>
                <p>Mēneša maksa</p>
                <p><strong>3) Mēneša maksa = {res.summa} / {res.periods} = {res.menesamaksa} EUR</strong></p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
};
