function syllables(word){
 const w=word.toLowerCase().replace(/[^a-z]/g,'');
 const exceptions={business:2,businesses:3,people:2,every:2,different:3,interesting:3,queue:1};
 if(exceptions[w])return exceptions[w];
 if(!w)return 1;if(w.length<=3)return 1;
 let n=(w.match(/[aeiouy]+/g)||[]).length;
 if(/e$/.test(w)&&!/[aeiou]le$/.test(w))n--;
 if(/(?:[^td]ed|[^aeiou]es)$/.test(w))n--;
 return Math.max(1,n);
}
function words(text){return text.match(/[A-Za-z]+(?:['’][A-Za-z]+)*/g)||[];}
function sentences(text){
 const out=[];let start=0;
 for(let i=0;i<text.length;i++){
  const ch=text[i];
  if(!'.!?'.includes(ch))continue;
  if(ch==='.'&&/\d/.test(text[i-1]||'')&&/\d/.test(text[i+1]||''))continue;
  const prefix=text.slice(start,i+1);
  if(ch==='.'&&/(?:\b(?:Mr|Mrs|Ms|Dr|Prof|Sr|Jr|vs|etc)|\b[A-Z])\.$/i.test(prefix))continue;
  let end=i+1;while(end<text.length&&/[.!?"”'’)]/.test(text[end]))end++;
  if(end<text.length&&!/\s/.test(text[end]))continue;
  if(words(text.slice(start,end)).length)out.push({start,end,text:text.slice(start,end)});
  start=end;i=end-1;
 }
 if(words(text.slice(start)).length)out.push({start,end:text.length,text:text.slice(start)});
 return out;
}
function analyze(text){
 if(typeof text!=='string')throw new Error('Please provide chapter text.');
 if(text.length>200000)throw new Error('Please keep your chapter under 200,000 characters.');
 const ws=words(text), ss=sentences(text);if(!ws.length)return null;
 const sy=ws.reduce((n,w)=>n+syllables(w),0);
 const score=206.835-1.015*(ws.length/ss.length)-84.6*(sy/ws.length);
 const ranked=ss.map((s,index)=>{const w=words(s.text);const syl=w.reduce((n,x)=>n+syllables(x),0);return {...s,index,wordCount:w.length,score:206.835-1.015*w.length-84.6*syl/w.length};}).sort((a,b)=>a.score-b.score||a.index-b.index).slice(0,5);
 return {score,wordCount:ws.length,sentenceCount:ss.length,ranked};
}
if(typeof module!=='undefined')module.exports={analyze,sentences,syllables};