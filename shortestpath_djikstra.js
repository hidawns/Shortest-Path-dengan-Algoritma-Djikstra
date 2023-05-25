//import library untuk visualisasi
const { Tracer, Array1DTracer, GraphTracer, LogTracer, Randomize, Layout, 
    VerticalLayout } = require('algorithm-visualizer');
     
     // G[i][j] menunjukkan bobot pada sisi graf mulai dari simpul ke-i hingga 
    simpul ke-j
     // contoh: G[0][3] = 8
     const G = [
     [0, 5, 6, 8, 3],
     [5, 0, 3, 1, 4],
     [6, 3, 0, 4, 2],
     [8, 1, 4, 0, 1],
     [3, 4, 2, 1, 0]
     ];
     
     const MAX_VALUE = Infinity;
     const S = []; // S[end] mengembalikan jarak dari simpul awal ke simpul akhir
     for (let i = 0; i < G.length; i++) S[i] = MAX_VALUE;
     
     // define tracer variables {
     const tracer = new GraphTracer().directed(false).weighted();
     const tracerS = new Array1DTracer();
     const logger = new LogTracer();
     Layout.setRoot(new VerticalLayout([tracer, tracerS, logger]));
     tracer.log(logger);
     tracer.set(G);
     tracerS.set(S);
     Tracer.delay();
     // }
     
     function Dijkstra(start, end) {
     let minIndex;
     let minDistance;
     const D = []; // D[i] menunjukkan apakah simpul ke-i ditemukan atau tidak
     for (let i = 0; i < G.length; i++) D.push(false);
     S[start] = 0; // Node awal berada pada jarak 0 dari dirinya sendiri
     // visualisasikan {
     tracerS.patch(start, S[start]);
     Tracer.delay();
     tracerS.depatch(start);
     tracerS.select(start);
     // }
     let k = G.length;
     while (k--) {
     // Mencari node dengan jarak terpendek dari S[minIndex]
     minDistance = MAX_VALUE;
     for (let i = 0; i < G.length; i++) {
     if (S[i] < minDistance && !D[i]) {
     minDistance = S[i];
     minIndex = i;
     }
     }
     if (minDistance === MAX_VALUE) break; // Jika tidak ada sisi dari node 
    saat ini, keluar dari loop
     D[minIndex] = true;
     // visualisasikan {
     tracerS.select(minIndex);
     tracer.visit(minIndex);
     Tracer.delay();
     // }
     // Untuk setiap simpul tetangga yang belum dikunjungi dari simpul saat 
    ini, periksa
     // apakah jalur ke sana akan lebih pendek jika melewati simpul saat ini
     for (let i = 0; i < G.length; i++) {
     if (G[minIndex][i] && S[i] > S[minIndex] + G[minIndex][i]) {
     S[i] = S[minIndex] + G[minIndex][i];
     // visualisasikan {
     tracerS.patch(i, S[i]);
     tracer.visit(i, minIndex, S[i]);
     Tracer.delay();
     tracerS.depatch(i);
     tracer.leave(i, minIndex);
     Tracer.delay();
     // }
     }
     }
     // visualisasikan {
     tracer.leave(minIndex);
     Tracer.delay();
     // }
     }
     // logger {
     if (S[end] === MAX_VALUE) {
     logger.println(`tidak ada jalur dari kantor pos ${start} ke kantor pos 
    ${end}`);
     } else {
     logger.println(`jalur terpendek dari kantor pos ${start} ke kantor pos 
    ${end} adalah ${S[end]} kilometer`);
     }
     // }
     }
     
     // mencari jarak dari simpul awal ke simpul akhir
     // s = start = simpul awal
     // e = end = simpul akhir
     const s = 0;
     let e;
     do {
     e = 2;
     } while (s === e);
     // logger {
     logger.println(`finding the shortest path from ${s} to ${e}`);
     Tracer.delay();
     // }
     Dijkstra(s, e);
    
