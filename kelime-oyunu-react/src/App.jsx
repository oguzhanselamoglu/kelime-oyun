import React, { useState, useEffect } from 'react';


function App() {

    const [oyun, setOyun] = useState({
        sorular: [
            {
                soru: "Siyah ile aynı anlama gelen bir renk",
                cevap: "Kara",
                soruldu: false
            },
            {
                soru: "Sık kullanılan bir isim",
                cevap: "Ahmet",
                soruldu: false
            },
            {
                soru: "Türkiye'nin başkenti",
                cevap: "Ankara",
                soruldu: false
            },
            {
                soru: "Karadenizde bir ilimiz",
                cevap: "Giresun",
                soruldu: false
            }
        ],
        mesaj: null,
        mesajClass: "",
        mesajSure: null,
        mevcutSoru: null,
        harfler: [],
        puan: 0,
        harfPuan: 0,
        yarismaciCevap: "",
        tamamlandi: false,
        sure: null,
        kalanSure: 0
    });

    const oyunaBasla = () => {
        let tamamlandi = false;
        let mevcutSoru = null;
        let puan = 0;

        oyun.sorular.forEach(x => {
            x.soruldu = false
        });

        oyun.kalanSure = 60;


        setOyun({ ...oyun, mevcutSoru, tamamlandi, puan });
        soruVer();
    };

    useEffect(() => {

        if (oyun.sure && oyun.kalanSure > 0) {
            oyun.sure = setInterval(() => {
                console.log(1);
                oyun.kalanSure--;
                if (oyun.kalanSure === 0) {
                    bitir();
                }
                setOyun({ ...oyun });
            }, 1000);

            return () => {
                clearTimeout(oyun.sure);
            }
        }
    })

    const bitir = () => {
        let tamamlandi = true;
        let mevcutSoru = null;
        setOyun({ ...oyun, mevcutSoru, tamamlandi });
        clearInterval(oyun.sure);
    };

    const soruVer = () => {

        let mevcutSoru = oyun.sorular.find(x => !x.soruldu);
        if (!mevcutSoru) {
            bitir();
            return;
        }
        let harfler = [];
        oyun.harfler = [];
        mevcutSoru.cevap.split("").forEach(x => {
            harfler.push({
                harf: x,
                acildi: false
            });
        });

        oyun.harfPuan = harfler.length * 100;
        mevcutSoru.soruldu = true;
        setOyun({ ...oyun, mevcutSoru, harfler, yarismaciCevap: "" });

    };

    const cevapla = () => {

        let cevap = oyun.yarismaciCevap.toLocaleUpperCase("tr");

        let harfPuan = oyun.harfPuan;
        let puan = oyun.puan;

        // this.yarismaciCevap = cevap;
        if (
            oyun.mevcutSoru.cevap.toLocaleUpperCase("tr") ===
            cevap.toLocaleUpperCase("tr")
        ) {

            mesajGoster("Tebrikler doğru cevap verdiniz", "basarili");
            puan += harfPuan;

        }
        else {
            mesajGoster("hatalı cevap verdiniz", "hata");
            puan -= harfPuan;
        }
        oyun.puan = puan;
        //  setOyun({ ...oyun, puan, yarismaciCevap: cevap });
        soruVer();
    };

    const harfVer = () => {
        let harfler = oyun.harfler;
        let rastgeleHarfIndex = Math.floor(harfler.length * Math.random());
        let harfPuan = oyun.harfPuan;
        if (harfPuan <= 100) {
            return;
        }

        let harf = harfler[rastgeleHarfIndex];
        while (harf.acildi) {
            rastgeleHarfIndex = Math.floor(harfler.length * Math.random());
            harf = harfler[rastgeleHarfIndex];
        }
        harf.acildi = true;
        harfPuan -= 100;
        oyun.harfPuan = harfPuan;
        setOyun({ ...oyun });
        //setOyun({ ...oyun, harfPuan, harfler });
    };

    const cevapDegisti = e => {
        setOyun({ ...oyun, yarismaciCevap: e.target.value });
    };

    const mesajGoster = (mesaj, tur) => {
        oyun.mesaj = mesaj;
        if (tur === "hata") {
            oyun.mesajClass = "bg-danger text-white";
        } else if (tur === "basarili") {
            oyun.mesajClass = "bg-success text-white";
        } else {
            oyun.mesajClass = "bg-dark text-white";
        }
        if (oyun.mesajSure) {
            clearTimeout(oyun.mesajSure);
            oyun.mesajSure = null;
        }
        //        oyun.mesajSure = setTimeout(() => this.mesaj = null, 3000);

        //   setOyun({ ...oyun ,mesaj:mesaj});
    };

    return (
        <div className="container mt-4" >
            {!oyun.mevcutSoru && (
                <div className="card mt-4" >
                    <div className="card-header">
                        <h5 className="mb-0">Kelime Oyunu Yarışmasına Hoşgeldiniz!</h5>
                    </div>
                    <div className="card-body">Yarışmaya Başlamak için yarışmaya başla buttonuna basın</div>
                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={oyunaBasla}>Yarışmaya Başla</button>
                    </div>
                </div>
            )
            }
            {
                oyun.mevcutSoru && (
                    <div className="card md-4">
                        <div className="card-header">
                            <h4>{oyun.mevcutSoru.soru}</h4>
                        </div>
                        <div className="card-body">
                            <div className="d-flex">
                                {oyun.harfler.map((harf, index) => (
                                    <div className="harf shadow mr-3 bg-dark text-white">
                                        {harf.acildi && <span>{harf.harf}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex">
                                <div className="mr-4">Harf puan {oyun.harfPuan}</div>
                                <div className="mr-4">Toplam puan {oyun.puan}</div>
                                <div className="mr-4">Kalan süreniz <kbd>{oyun.kalanSure}</kbd></div>
                            </div>
                        </div>
                        {
                            oyun.mesaj && (
                                <div className={"card-footer " + oyun.mesajClass}>{oyun.mesaj}</div>
                            )
                        }
                        <div className="card-footer">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Cevabınız" value={oyun.yarismaciCevap} onChange={cevapDegisti} />
                                <div className="input-group-append" id="button-addon4">
                                    <button className="btn btn-success" type="button" onClick={cevapla}>Cevapla</button>
                                    <button className="btn btn-outline-secondary" type="button" onClick={harfVer}>Harfver</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >

    )
}

export default (App);



