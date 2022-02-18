export default function Pilihan ({soal}) {
    const daftar = [

        // soal.a, soal.b, soal.c, soal.d, soal.e
        {seq:"a", Text: soal.a},
        {seq:"b", Text: soal.b},
        {seq:"c", Text: soal.c},
        {seq:"d", Text: soal.d},
        {seq:"e", Text: soal.e}

    ]

    return (
        // <pre>{JSON.stringify(soal.a, null, 2)}</pre>

        <ol style={{listStyleType: "upper-alpha"}}>
            {daftar.sort (() => Math.random () -0.5).map(d => (
                <li ket= {d.seq} seq={d.seq}>
                    <div dangerouslySetInnerHTML={{__html: d.Text}} />
                </li>
            ))}
        </ol>

    )
}