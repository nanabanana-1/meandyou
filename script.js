const XP=[0,100,250,450,700,1000,1400,1900,2500,3200,4000];

let data=JSON.parse(localStorage.getItem("duoTracker"))||{
vitoria:{xp:0,peso:"",gluteo:""},
rob:{xp:0,peso:""},
casal:{xp:0,treinos:0},
streak:0,
ultimoTreino:"",
diario:""
};

function nivel(xp){
 let n=1;
 for(let i=0;i<XP.length;i++) if(xp>=XP[i]) n=i+1;
 return n;
}

function tituloVit(n){
 if(n>=10) return "👑 Rainha da Hip Thrust";
 if(n>=5) return "⚔️ Guardiã das Pernas";
 return "🍑 Aprendiz dos Glúteos";
}

function tituloRob(n){
 if(n>=10) return "👑 Mestre da Evolução";
 if(n>=5) return "⚔️ Guerreiro da Disciplina";
 return "💪 Iniciante Determinado";
}

function salvarLocal(){
 localStorage.setItem("duoTracker",JSON.stringify(data));
}

function registrarTreino(){
 const hoje=new Date().toDateString();

 if(data.ultimoTreino!==hoje){
   data.streak++;
   data.ultimoTreino=hoje;
 }

 data.casal.treinos++;
 data.vitoria.xp+=10;
 data.rob.xp+=10;
 data.casal.xp+=5;

 atualizar();
 alert("🎉 Treino registrado!");
}

function salvarTudo(){
 data.vitoria.peso=document.getElementById("pesoV").value;
 data.vitoria.gluteo=document.getElementById("gluteoV").value;
 data.rob.peso=document.getElementById("pesoR").value;
 data.diario=document.getElementById("diario").value;

 data.vitoria.xp+=5;
 data.rob.xp+=5;

 atualizar();
 alert("💖 Dados salvos!");
}

function conquistas(){
 let c=[];
 if(data.casal.treinos>=1) c.push("🥉 Primeiro Treino");
 if(data.casal.treinos>=10) c.push("💪 10 Treinos");
 if(data.casal.treinos>=25) c.push("💕 Casal Imparável");
 if(nivel(data.vitoria.xp)>=5) c.push("🍑 Guardiã das Pernas");
 if(nivel(data.rob.xp)>=5) c.push("⚔️ Guerreiro da Disciplina");
 return c;
}

function atualizar(){
 document.getElementById("treinos").textContent=data.casal.treinos;
 document.getElementById("streak").textContent=data.streak;

 document.getElementById("pesoV").value=data.vitoria.peso;
 document.getElementById("gluteoV").value=data.vitoria.gluteo;
 document.getElementById("pesoR").value=data.rob.peso;

 document.getElementById("xpV").textContent=data.vitoria.xp;
 document.getElementById("xpR").textContent=data.rob.xp;

 const nv=nivel(data.vitoria.xp);
 const nr=nivel(data.rob.xp);
 const nc=nivel(data.casal.xp);

 document.getElementById("nivelV").textContent=nv;
 document.getElementById("nivelR").textContent=nr;
 document.getElementById("nivelCasal").textContent="Nível do Casal: "+nc;

 document.getElementById("tituloV").textContent=tituloVit(nv);
 document.getElementById("tituloR").textContent=tituloRob(nr);

 document.getElementById("barCasal").style.width=Math.min((data.casal.xp%100),100)+"%";

 document.getElementById("diario").value=data.diario;

 document.getElementById("conquistas").innerHTML=conquistas()
 .map(x=>`<span class="badge">${x}</span>`).join("");

 salvarLocal();
}

const frases=[
"💖 Vocês são um time.",
"✨ Pequenos passos geram grandes mudanças.",
"💪 A consistência vence a perfeição.",
"🍑 Um treino de cada vez.",
"🌸 O progresso está acontecendo."
];

document.getElementById("frase").textContent=frases[Math.floor(Math.random()*frases.length)];
atualizar();