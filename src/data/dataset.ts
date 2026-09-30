export interface DocumentMetadata {
  fileName: string;
  agreementValue: string;
  agreementStartDate: string;
  agreementEndDate: string;
  renewalNoticeDays: string;
  partyOne: string;
  partyTwo: string;
  fileType?: 'docx' | 'png' | 'pdf' | 'text';
  sampleText?: string;
}

export interface FieldRecallResult {
  fieldName: string;
  trueCount: number;
  falseCount: number;
  totalCount: number;
  recallPercent: number;
}

export interface EvaluationSummary {
  perFieldRecall: {
    agreementValue: FieldRecallResult;
    agreementStartDate: FieldRecallResult;
    agreementEndDate: FieldRecallResult;
    renewalNoticeDays: FieldRecallResult;
    partyOne: FieldRecallResult;
    partyTwo: FieldRecallResult;
  };
  overallMacroRecall: number;
  totalDocuments: number;
  fieldLevelMatches: Array<{
    fileName: string;
    groundTruth: DocumentMetadata;
    predicted: DocumentMetadata;
    matches: {
      agreementValue: boolean;
      agreementStartDate: boolean;
      agreementEndDate: boolean;
      renewalNoticeDays: boolean;
      partyOne: boolean;
      partyTwo: boolean;
    };
  }>;
}

export const TRAIN_DATASET: DocumentMetadata[] = [
  {
    fileName: "24158401-Rental-Agreement",
    agreementValue: "12000",
    agreementStartDate: "01.04.2008",
    agreementEndDate: "31.03.2009",
    renewalNoticeDays: "60",
    partyOne: "Hanumaiah",
    partyTwo: "Vishal Bhardwaj",
    fileType: "docx",
    sampleText: `RENTAL AGREEMENT
This agreement entered into on this 1st day of April 2008 between Hanumaiah, hereinafter called the LESSOR of the One Part, and Vishal Bhardwaj, hereinafter called the LESSEE of the Other Part.
WHEREAS the Lessor agrees to let out and the Lessee agrees to take on lease the premises situated at No. 24, 2nd Cross, Indira Nagar, Bangalore for a monthly rent of Rs. 12000/- (Rupees Twelve Thousand only).
The lease shall be for an initial period of 11 months commencing from 01.04.2008 to 31.03.2009.
Either party may terminate or request renewal of this agreement by giving 60 days renewal notice in writing prior to the expiration of the tenancy term.`
  },
  {
    fileName: "95980236-Rental-Agreement",
    agreementValue: "9000",
    agreementStartDate: "01.04.2010",
    agreementEndDate: "31.03.2011",
    renewalNoticeDays: "30",
    partyOne: "S.Sakunthala",
    partyTwo: "V.V.Ravi Kian",
    fileType: "docx",
    sampleText: `HOUSE RENT AGREEMENT
This Rental Agreement made and executed at Bangalore on 01.04.2010 by and between:
S.Sakunthala, residing at Bangalore, hereinafter referred to as the FIRST PARTY / LANDLADY.
AND
V.V.Ravi Kian, residing at Bangalore, hereinafter referred to as the SECOND PARTY / TENANT.
Terms and Conditions:
1. The monthly rent payable by the Tenant to the Landlady is Rs. 9000 (Nine Thousand Only) per month.
2. The duration of this agreement is for 11 months starting from 01.04.2010 and ending on 31.03.2011.
3. If either party intends to vacate or renew the premises, they must give 30 days notice to the other party.`
  },
  {
    fileName: "156155545-Rental-Agreement-Kns-Home",
    agreementValue: "12000",
    agreementStartDate: "15.12.2012",
    agreementEndDate: "14.11.2013",
    renewalNoticeDays: "30",
    partyOne: "V.K.NATARAJ",
    partyTwo: "VYSHNAVI DAIRY SPECIALITIES Private Ltd",
    fileType: "docx",
    sampleText: `COMMERCIAL LEASE / RENTAL AGREEMENT
This deed of agreement is made on this 15th Day of December 2012 between:
V.K.NATARAJ, residing at Mysore Road, Bangalore (Party of the First Part / Lessor)
AND
VYSHNAVI DAIRY SPECIALITIES Private Ltd, represented by its authorized signatory (Party of the Second Part / Lessee).
WHEREAS the Lessor grants tenancy for warehouse/residence purposes at a monthly rent of Rs. 12000/-.
The agreement takes effect on 15.12.2012 and shall remain valid until 14.11.2013.
Renewal notice period required by either party shall be 30 days prior to term expiry.`
  },
  {
    fileName: "228094620-Rental-Agreement",
    agreementValue: "15000",
    agreementStartDate: "07.07.2013",
    agreementEndDate: "06.06.2014",
    renewalNoticeDays: "30",
    partyOne: "KAPIL MEHROTRA",
    partyTwo: ".B.Kishore",
    fileType: "docx",
    sampleText: `RESIDENTIAL TENANCY AGREEMENT
Made at New Delhi on 07.07.2013.
Between KAPIL MEHROTRA (Landlord / First Party)
AND .B.Kishore (Tenant / Second Party).
The monthly rent agreed upon is Rs. 15000 (Rupees Fifteen Thousand only) payable before 5th of every month.
Tenancy period: commencing from 07.07.2013 and expiring on 06.06.2014.
Renewal Notice: A written notice of 30 days is mandatory for termination or renewal.`
  }
];

export const TEST_DATASET: DocumentMetadata[] = [
  {
    fileName: "6683127-House-Rental-Contract-GERALDINE-GALINATO-v2-Page-1",
    agreementValue: "6500",
    agreementStartDate: "20.05.2007",
    agreementEndDate: "20.05.2008",
    renewalNoticeDays: "15",
    partyOne: "Antonio Levy S. Ingles, Jr. and/or Mary Rose C. Ingles",
    partyTwo: "GERALDINE Q. GALINATO",
    fileType: "png",
    sampleText: `CONTRACT OF LEASE
KNOW ALL MEN BY THESE PRESENTS:
This Contract of Lease made and executed this 20th day of May 2007 by and between:
Antonio Levy S. Ingles, Jr. and/or Mary Rose C. Ingles, of legal age, Filipino, hereinafter referred to as LESSOR;
- and -
GERALDINE Q. GALINATO, of legal age, Filipino, hereinafter referred to as LESSEE;
WITNESSETH:
1. RENT: The monthly rental rate for the leased premises shall be 6500 Philippine Pesos.
2. TERM: This lease shall be for a period of one (1) year commencing from 20.05.2007 to 20.05.2008.
3. RENEWAL / TERMINATION: Lessee shall notify Lessor in writing at least 15 days in advance prior to renewal notice or vacation.`
  },
  {
    fileName: "6683129-House-Rental-Contract-Geraldine-Galinato-v2",
    agreementValue: "6500",
    agreementStartDate: "20.05.2007",
    agreementEndDate: "20.05.2008",
    renewalNoticeDays: "15",
    partyOne: "Antonio Levy S. Ingles, Jr. and/or Mary Rose C. Ingles",
    partyTwo: "GERALDINE Q. GALINATO",
    fileType: "docx",
    sampleText: `CONTRACT OF LEASE (Full Document)
Executed on 20.05.2007 between Antonio Levy S. Ingles, Jr. and/or Mary Rose C. Ingles (Lessor) and GERALDINE Q. GALINATO (Lessee).
Agreed monthly rent amount: 6500.
Contract commencement: 20.05.2007 and termination date: 20.05.2008.
Notice of renewal is set to 15 days.`
  },
  {
    fileName: "18325926-Rental-Agreement-1",
    agreementValue: "4000",
    agreementStartDate: "05.12.2008",
    agreementEndDate: "31.11.2009",
    renewalNoticeDays: "90",
    partyOne: "MR.K.Kuttan",
    partyTwo: "P.M. Narayana Namboodri",
    fileType: "docx",
    sampleText: `AGREEMENT FOR LEASE
Entered into on 05.12.2008 by MR.K.Kuttan (Landlord/Party One) and P.M. Narayana Namboodri (Tenant/Party Two).
Monthly rent fixed at Rs. 4000.
Start Date of Lease: 05.12.2008; End Date: 31.11.2009.
Renewal Notice (Days): 90 days advance notification required.`
  },
  {
    fileName: "24158401-Rental-Agreement",
    agreementValue: "12000",
    agreementStartDate: "01.04.2008",
    agreementEndDate: "31.03.2009",
    renewalNoticeDays: "60",
    partyOne: "Hanumaiah",
    partyTwo: "Vishal Bhardwaj",
    fileType: "png",
    sampleText: `RENTAL AGREEMENT
Parties: Hanumaiah (Party One) & Vishal Bhardwaj (Party Two).
Agreement Value: 12000 monthly rent.
Agreement Start Date: 01.04.2008.
Agreement End Date: 31.03.2009.
Notice period for renewal: 60 days.`
  },
  {
    fileName: "36199312-Rental-Agreement",
    agreementValue: "3800",
    agreementStartDate: "01.05.2010",
    agreementEndDate: "31.04.2011",
    renewalNoticeDays: "30",
    partyOne: "Balaji.R",
    partyTwo: "Kartheek R",
    fileType: "docx",
    sampleText: `HOUSE RENT AGREEMENT
This agreement executed on 1st May 2010 between Balaji.R (Owner/Party One) and Kartheek R (Tenant/Party Two).
Monthly rent of Rs. 3800.
Period: from 01.05.2010 to 31.04.2011.
Renewal notice term: 30 days.`
  },
  {
    fileName: "44737744-Maddireddy-Bhargava-Reddy-Rental-Agreement",
    agreementValue: "3000",
    agreementStartDate: "20.09.2010",
    agreementEndDate: "19.07.2011",
    renewalNoticeDays: "",
    partyOne: "M.V.V. VIJAYA SHANKAR",
    partyTwo: "MADDIREDDY BHARGAVA REDDY",
    fileType: "docx",
    sampleText: `RENTAL AGREEMENT
Lessor: M.V.V. VIJAYA SHANKAR
Lessee: MADDIREDDY BHARGAVA REDDY
Rent amount per month: Rs. 3000.
Agreement Start Date: 20.09.2010.
Agreement End Date: 19.07.2011.
Notice period: Not specified in this clause.`
  },
  {
    fileName: "47854715-RENTAL-AGREEMENT",
    agreementValue: "9000",
    agreementStartDate: "01.04.2010",
    agreementEndDate: "31.02.2011",
    renewalNoticeDays: "60",
    partyOne: "P C MATHEW",
    partyTwo: "L GOPINATH",
    fileType: "png",
    sampleText: `RENTAL AGREEMENT
Party of the First Part: P C MATHEW
Party of the Second Part: L GOPINATH
Agreed Rent: 9000 Rupees.
Effective Date: 01.04.2010.
Expiring Date: 31.02.2011.
Renewal Notice period: 60 days advance.`
  },
  {
    fileName: "50070534-RENTAL-AGREEMENT",
    agreementValue: "10000",
    agreementStartDate: "01.04.2010",
    agreementEndDate: "30.03.2011",
    renewalNoticeDays: "90",
    partyOne: "P. JohnsonRavikumar",
    partyTwo: "Saravanan BV",
    fileType: "png",
    sampleText: `LEASE AGREEMENT
Between P. JohnsonRavikumar (Party One) and Saravanan BV (Party Two).
Monthly consideration / Value: 10000.
Start Date: 01.04.2010.
End Date: 30.03.2011.
Renewal notice required: 90 days.`
  },
  {
    fileName: "54770958-Rental-Agreement",
    agreementValue: "8000",
    agreementStartDate: "01.04.2011",
    agreementEndDate: "31.03.2012",
    renewalNoticeDays: "90",
    partyOne: "K. Parthasarathy",
    partyTwo: "Veerabrahmam Bathini",
    fileType: "docx",
    sampleText: `RESIDENTIAL AGREEMENT
Executed by K. Parthasarathy (Party One) in favour of Veerabrahmam Bathini (Party Two).
Value of monthly tenancy: Rs. 8000.
Tenure starts: 01.04.2011 and concludes: 31.03.2012.
Renewal notice: 90 days prior written notice.`
  },
  {
    fileName: "54945838-Rental-Agreement",
    agreementValue: "5500",
    agreementStartDate: "21.04.2011",
    agreementEndDate: "19.02.2012",
    renewalNoticeDays: "60",
    partyOne: "Asha Ramesh & Ramesh K.N",
    partyTwo: "Sadasivuni Deepthi & Sadasivuni Kiran",
    fileType: "docx",
    sampleText: `RENTAL AGREEMENT
Parties:
Party One: Asha Ramesh & Ramesh K.N
Party Two: Sadasivuni Deepthi & Sadasivuni Kiran
Monthly Rent: 5500.
Agreement Start Date: 21.04.2011.
Agreement End Date: 19.02.2012.
Renewal Notice period: 60 days.`
  }
];

// Helper to normalize strings for exact comparison
export function normalizeValue(val: string | null | undefined): string {
  if (val === null || val === undefined) return "";
  return String(val).trim().replace(/\s+/g, ' ');
}

export function areValuesMatching(groundTruth: string, predicted: string): boolean {
  const normGt = normalizeValue(groundTruth).toLowerCase();
  const normPred = normalizeValue(predicted).toLowerCase();

  // If both empty/absent
  if (!normGt && !normPred) return true;
  if (!normGt || !normPred) return false;

  // Direct match
  if (normGt === normPred) return true;

  // Numbers comparison (e.g. "12000" vs "12,000" or "12000.00")
  const numGt = parseFloat(normGt.replace(/[^0-9.]/g, ''));
  const numPred = parseFloat(normPred.replace(/[^0-9.]/g, ''));
  if (!isNaN(numGt) && !isNaN(numPred) && numGt === numPred && !normGt.includes('-') && !normGt.includes('.')) {
    return true;
  }

  // Names comparison (strip Mr., Mrs., Dr., etc.)
  const cleanGt = normGt.replace(/^(mr\.|mrs\.|ms\.|dr\.)\s*/i, '').trim();
  const cleanPred = normPred.replace(/^(mr\.|mrs\.|ms\.|dr\.)\s*/i, '').trim();
  if (cleanGt === cleanPred) return true;

  return false;
}

export function computeEvaluation(
  groundTruthList: DocumentMetadata[],
  predictionsList: DocumentMetadata[]
): EvaluationSummary {
  const predMap = new Map<string, DocumentMetadata>();
  for (const pred of predictionsList) {
    predMap.set(pred.fileName, pred);
  }

  const fields: Array<keyof Pick<DocumentMetadata, 'agreementValue' | 'agreementStartDate' | 'agreementEndDate' | 'renewalNoticeDays' | 'partyOne' | 'partyTwo'>> = [
    'agreementValue',
    'agreementStartDate',
    'agreementEndDate',
    'renewalNoticeDays',
    'partyOne',
    'partyTwo'
  ];

  const counts: Record<string, { trueCount: number; falseCount: number }> = {
    agreementValue: { trueCount: 0, falseCount: 0 },
    agreementStartDate: { trueCount: 0, falseCount: 0 },
    agreementEndDate: { trueCount: 0, falseCount: 0 },
    renewalNoticeDays: { trueCount: 0, falseCount: 0 },
    partyOne: { trueCount: 0, falseCount: 0 },
    partyTwo: { trueCount: 0, falseCount: 0 }
  };

  const fieldLevelMatches: EvaluationSummary['fieldLevelMatches'] = [];

  for (const gt of groundTruthList) {
    const pred = predMap.get(gt.fileName) || {
      fileName: gt.fileName,
      agreementValue: "",
      agreementStartDate: "",
      agreementEndDate: "",
      renewalNoticeDays: "",
      partyOne: "",
      partyTwo: ""
    };

    const docMatches: any = {};

    for (const f of fields) {
      const match = areValuesMatching(gt[f] || "", pred[f] || "");
      docMatches[f] = match;
      if (match) {
        counts[f].trueCount++;
      } else {
        counts[f].falseCount++;
      }
    }

    fieldLevelMatches.push({
      fileName: gt.fileName,
      groundTruth: gt,
      predicted: pred,
      matches: docMatches
    });
  }

  const calcRecall = (fieldName: string, label: string): FieldRecallResult => {
    const t = counts[fieldName].trueCount;
    const f = counts[fieldName].falseCount;
    const total = t + f;
    const recall = total > 0 ? (t / total) * 100 : 0;
    return {
      fieldName: label,
      trueCount: t,
      falseCount: f,
      totalCount: total,
      recallPercent: Math.round(recall * 10) / 10
    };
  };

  const perFieldRecall = {
    agreementValue: calcRecall('agreementValue', 'Agreement Value'),
    agreementStartDate: calcRecall('agreementStartDate', 'Agreement Start Date'),
    agreementEndDate: calcRecall('agreementEndDate', 'Agreement End Date'),
    renewalNoticeDays: calcRecall('renewalNoticeDays', 'Renewal Notice (Days)'),
    partyOne: calcRecall('partyOne', 'Party One'),
    partyTwo: calcRecall('partyTwo', 'Party Two')
  };

  const avgRecall =
    (perFieldRecall.agreementValue.recallPercent +
      perFieldRecall.agreementStartDate.recallPercent +
      perFieldRecall.agreementEndDate.recallPercent +
      perFieldRecall.renewalNoticeDays.recallPercent +
      perFieldRecall.partyOne.recallPercent +
      perFieldRecall.partyTwo.recallPercent) / 6;

  return {
    perFieldRecall,
    overallMacroRecall: Math.round(avgRecall * 10) / 10,
    totalDocuments: groundTruthList.length,
    fieldLevelMatches
  };
}
