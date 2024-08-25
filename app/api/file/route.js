import { NextResponse } from 'next/server';
import PdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false// Disable Next.js's default body parser
  },
};

export async function POST(request) {
  try {
    let body = await request.formData()
    let file = body.get('file')
    const arrayBuffer= await file.arrayBuffer()
    let data=await PdfParse(arrayBuffer)
    const text= data.text
  let Array= text.trim().split("\n \n").map(item=>{
    let Q,options=[],ans;
    item.trim().split("\n").map(line=>{
      if(!isNaN(parseInt(line.charAt(0)))) Q=line;
      else if(line.trim().startsWith("Answer")) ans=line.charAt(line.length-1)
        else if(line.trim().charAt(0)=="A"||line.trim().charAt(0)=="B"||line.trim().charAt(0)=="C"||line.trim().charAt(0)=="D") options.push(line)
    })
    return {Question:Q,options,answer:ans}
  })
    console.log(Array)
    

    return NextResponse.json({text:Array})
  } catch (error) {
    return NextResponse.json({success:false,message:error.message})
    
  }
}
