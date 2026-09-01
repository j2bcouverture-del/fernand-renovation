const menuBtn=document.getElementById('menuBtn');
const menuPanel=document.getElementById('menuPanel');
if(menuBtn&&menuPanel){menuBtn.addEventListener('click',()=>{const o=menuPanel.classList.toggle('open');document.body.classList.toggle('menu-open',o);menuBtn.setAttribute('aria-expanded',o?'true':'false')});menuPanel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menuPanel.classList.remove('open');document.body.classList.remove('menu-open')}));}

document.querySelectorAll('.urgencyChoice').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.urgencyChoice').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const result=document.getElementById('urgencyResult'); if(!result)return;
  const type=btn.dataset.type; const data={
    fuite:['Fuite active','Une recherche de fuite et une mise hors d’eau rapide sont recommandées. Évitez d’attendre si l’eau pénètre déjà dans l’habitation.'],
    tuiles:['Tuiles déplacées ou cassées','Une inspection de la zone, le remplacement des éléments endommagés et le contrôle du faîtage/rives sont à prévoir.'],
    tempete:['Après vent, grêle ou tempête','Priorité à la sécurisation : contrôle visuel, bâchage si nécessaire puis devis détaillé pour la remise en état.']
  }[type]; result.innerHTML=`<strong>${data[0]}</strong><p>${data[1]}</p><a class="btn blue" href="#devis">Demander un diagnostic</a>`;result.classList.add('show');
}));

const questions=[
 {q:'Quel âge a approximativement la couverture ?',a:[['Moins de 10 ans',0],['10 à 20 ans',1],['20 à 35 ans',2],['Plus de 35 ans',3]]},
 {q:'Avez-vous des fuites ou infiltrations ?',a:[['Non',0],['Une fuite ponctuelle',1],['Plusieurs zones',3],['Oui, régulièrement',4]]},
 {q:'Les tuiles ou ardoises sont-elles abîmées ?',a:[['Très peu',0],['Quelques-unes',1],['Beaucoup',3],['Aspect très dégradé',4]]},
 {q:'Des réparations ont-elles déjà été faites récemment ?',a:[['Aucune',0],['Une fois',1],['Plusieurs fois',3],['Très souvent',4]]},
 {q:'L’état de la charpente vous inquiète-t-il ?',a:[['Non',0],['Je ne sais pas',1],['Quelques traces/déformations',3],['Oui clairement',4]]}
];
let qi=0,score=0;const quiz=document.getElementById('quizQuestions');const progress=document.querySelector('.progress span');
function renderQ(){if(!quiz)return; if(qi>=questions.length){const r=document.getElementById('quizResult');const title=score<=4?'Réparation ciblée probablement pertinente':score<=10?'Contrôle complet conseillé':'Rénovation globale à étudier';const text=score<=4?'L’état décrit semble compatible avec une intervention localisée, sous réserve d’une inspection sur place.':score<=10?'Plusieurs signaux justifient un diagnostic complet avant de choisir entre réparation et rénovation.':'Le cumul des signes d’usure peut rendre une rénovation globale plus cohérente qu’une succession de petites réparations.';quiz.innerHTML='';r.innerHTML=`<h3>${title}</h3><p>${text}</p><a class="btn blue" href="#devis">Demander un contrôle de toiture</a>`;r.classList.add('show');if(progress)progress.style.width='100%';return;} const x=questions[qi];quiz.innerHTML=`<div class="question active"><h3>${x.q}</h3><div class="answerGrid">${x.a.map(v=>`<button class="answer" data-score="${v[1]}">${v[0]}</button>`).join('')}</div></div>`;if(progress)progress.style.width=((qi/questions.length)*100)+'%';quiz.querySelectorAll('.answer').forEach(b=>b.addEventListener('click',()=>{score+=Number(b.dataset.score);qi++;renderQ()}));}
renderQ();

const estBtn=document.getElementById('estimateBtn'); if(estBtn)estBtn.addEventListener('click',()=>{const surface=Math.max(1,Number(document.getElementById('surface').value||0));const work=document.getElementById('workType').value;const material=document.getElementById('material').value;let rates={repair:[45,120],clean:[12,28],renov:[130,260],zing:[55,140]}[work];let factor=material==='ardoise'?1.22:material==='zinc'?1.30:1;let lo=Math.round(surface*rates[0]*factor/50)*50,hi=Math.round(surface*rates[1]*factor/50)*50;document.getElementById('estimateBox').innerHTML=`Ordre de grandeur indicatif : <strong>${lo.toLocaleString('fr-FR')} à ${hi.toLocaleString('fr-FR')} €</strong>.<br><span class="small">Cette estimation ne remplace pas un devis : pente, accès, état du support, échafaudage et finitions peuvent fortement modifier le prix.</span>`;});

const quote=document.getElementById('quoteForm'); if(quote)quote.addEventListener('submit',e=>{e.preventDefault();const s=document.getElementById('quoteStatus');s.textContent='Le formulaire est prêt. Ajoutez le téléphone et l’e-mail de Fernand Rénovation dans le fichier avant la mise en ligne pour activer l’envoi.';});

document.querySelectorAll('[data-contact-missing]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.getElementById('devis')?.scrollIntoView({behavior:'smooth'});}));
