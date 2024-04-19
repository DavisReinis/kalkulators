import {DarbaAlgasKalkulators} from "@/app/ui/darbaAlgasKalkulators";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import React from "react";
import Link from "next/link";


export default function Page() {
  return (
    <div>
      <DarbaAlgasKalkulators/>
      <Accordion type="single" collapsible className={"pt-10 pb-14"}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Kā tiek aprēķināts iedzīvotāju ienākuma nodoklis?</AccordionTrigger>
          <AccordionContent>
            <p>Izmaksājot darba algu, tiek piemērota IIN progresīvā likme. Tas nozīmē, ka nodokļa maksātājam nodokļa
              likme ir piemērota atbilstoši viņa gūtajiem ienākumiem.</p>
            <p>Nodokļa likmes apmērs 2024:</p>
            <ul>
              <li>Iedzīvotāju ienākumu nodokļa likme algai gadā līdz EUR 20 004 – 20%</li>
              <li>Iedzīvotāju ienākumu nodokļa likme algai gadā līdz EUR 20 004,01 – 23%</li>
              <li>Valsts sociālās apdrošināšanas obligātās iemaksas likme 10,5%</li>
              <li>Atvieglojums par apgādībā esošām personām EUR 250</li>
              <li>Neapliekamais minimums EUR 0-500</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Cik ilgi glabājās saglabātie aprēķini?</AccordionTrigger>
          <AccordionContent>
            Tie tiek glabāti jūsu pārlūkprogrammā līdz bridim, kad tos pats izdzēsīsiet.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Vai kāds varēs apskatītes manus datus?</AccordionTrigger>
          <AccordionContent>
            Nē, tie glabājas tikai un vienīgi pie jums.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Ar algas aprēķiniem saistītie termini</AccordionTrigger>
          <AccordionContent>
            <p>Lai labāk rīkotos ar algu kalkulatoru un izprastu visu, ar darba algas samaksu saistīto ir daži galvenie
              termini, kas Jums būtu jāpārzina. Apskatīsim tos tuvāk.</p>
            <p><strong>Bruto alga</strong> – Bruto atalgojums ir naudas summa, ko darbinieks regulāri saņem no uzņēmuma,
              pirms tiek veikti jebkādi atskaitījumi, piemēram nodokļi. Kad tiek izsludināts darba piedāvājums, norādītā
              alga parasti tiek attēlota kā bruto alga, tāpēc tā tiek dēvēta arī kā alga “uz papīra”.</p>
            <p><strong>Neto alga</strong> – Neto alga ir Jūsu kopējā atalgojuma summa pēc visu nodokļu un citu
              darbinieku iemaksu atskaitīšanas jeb tas, ko darbinieks saņem “uz rokas”. Šī ir Jūsu bankas kontā
              iemaksātā naudas summa, ko var izmantot pēc saviem ieskatiem. Algas kalkulators ļauj aprēķināt, kāda ir
              neto alga, ja ir zināma bruto alga.</p>
            <p><strong>Minimālā darba alga</strong> – Katrā valstī tā var atšķirties un tā var mainīties arī pa gadiem.
              Latvijā, minimālā darba alga 2024. gadā ir EUR 700 mēnesī.</p>
            <p><strong>Neapliekamais minimums</strong> – Neapliekamo minimumu piemēro Jūsu ienākumiem, pirms tiem ir
              uzlikts iedzīvotāja ienākuma nodoklis jeb IIN. Gada laikā prognozēto neapliekamo minimumu parasti piemēro
              darba devējs, jeb darba vieta, kuru savā algas nodokļu grāmatiņā esat norādījis kā galveno ienākumu
              gūšanas vietu. Taču VID gada ienākumu deklarācijā, kuru visi parasti iesniedz marta sākumā, par visu
              kalendāra gadu piemēro gada diferenciēto neapliekamo minimumu. Tas nozīmē, ka tiek pārrēķināts jau gada
              laikā piemērotais un prognozētais neapliekamais minimums.</p>
            <p>2024. gadā diferencētā neapliekamā minimuma aprēķināšanai ir noteikti šādi lielumi:</p>
            <ul>
              <li>Maksimālais neapliekamais minimums – € 6000 gadā;</li>
              <li>Apliekamā ienākuma apmērs, līdz kuram piemēro maksimālo neapliekamo minimumu, – € 6000 gadā;</li>
              <li>Apliekamā ienākuma apmērs, virs kura nepiemēro diferencēto neapliekamo minimumu, – € 21 600 gadā;</li>
              <li>Koeficients – 0,38462.</li>
            </ul>
            <p>Personai, kurai izmaksā pensiju, piemēro pensionāra neapliekamo minimumu. Pensionāra neapliekamo minimumu
              gada laikā piemēro pensijas izmaksātājs. Pensionāra neapliekamais minimums pēc 2023. gada ir € 6000 (€ 500
              mēnesī).</p>

          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={"item-5"}>
          <AccordionTrigger>Kas ir VSAOI?</AccordionTrigger>
          <AccordionContent>
            Vairāk par Valsts Sociālās Apdrošināšanas Obligātajām Iemaksām iespējams uzzināt Valsts Ieņēmuma dienesta mājaslapā.{" "}
            <Link href={"https://www.vid.gov.lv/lv/valsts-socialas-apdrosinasanas-obligatas-iemaksas"} className={"underline"}>VSAOI</Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

  )
}