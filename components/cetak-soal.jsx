import Pilihan from "./pilihan";

export default function CetakSoal ({ soal, kondisi }) {
    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: kondisi.seq}} />
            <div dangerouslySetInnerHTML={{__html: kondisi.konten}} />
            <div dangerouslySetInnerHTML={{__html: soal.seq}} />
            <div dangerouslySetInnerHTML={{__html: soal.konten}} />
            <Pilihan soal={soal}/>
        </div>
    )
}