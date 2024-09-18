import { NextResponse } from 'next/server';
import PdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false// Disable Next.js's default body parser
  },
};

export async function POST(request) {
  let QuestionRegex=/^(Q?\d+[\.\)]?|Q\d+[\.\)]?)\s*/
  let OptionRegex=/^[A-Za-z\d]\s*[\.\)]\s*|\(\s*[A-Za-z\d]+\s*\)\s*/
  let AnsRegex= /(answer|ans|correct answer is)\s*[:\-]?\s*[A-Za-z\d]/i;

  try{
    let body = await request.formData()
    let file = body.get('file')
    const arrayBuffer= await file.arrayBuffer()
    let data=await PdfParse(arrayBuffer)
    const text= data.text
  let Array= text.trim().split("\n \n").map(item=>{
    let Q,options=[],ans;
    item.trim().split("\n").map(line=>{
      // if(!isNaN(parseInt(line.charAt(0)))) Q=line;
      // console.log(line,QuestionRegex.test(line))
      if(QuestionRegex.test(line)) Q= line
      else if(AnsRegex.test(line)) ans=line
        else if(OptionRegex.test(line)) options.push(line)
    })
  // console.log()
    return {question:Q,options,answer:ans}
  })
    console.log(text)
    

    return NextResponse.json({text:Array})
  } catch (error) {
    return NextResponse.json({success:false,message:error.message})
    
  }
}
