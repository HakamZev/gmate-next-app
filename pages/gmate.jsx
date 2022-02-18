import connect from "../lib/database"
import {
    objectify,
    getTestSequence,
    randomGroupKeys,
    groupByKey
} from "gmate"

function CetakSoal ({ soal, kondisi }) {
    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: kondisi.seq}} />
            <div dangerouslySetInnerHTML={{__html: kondisi.konten}} />
            <div dangerouslySetInnerHTML={{__html: soal.seq}} />
            <div dangerouslySetInnerHTML={{__html: soal.konten}} />
            <ol style={{listStyleType: "upper-alpha"}}>
                <li style={{ backgroundColor: "white" }}><div dangerouslySetInnerHTML={{__html: soal.b}} /></li>
                <li><div dangerouslySetInnerHTML={{__html: soal.c}} /></li>
                <li><div dangerouslySetInnerHTML={{__html: soal.d}} /></li>
                <li><div dangerouslySetInnerHTML={{__html: soal.a}} /></li>
                <li><div dangerouslySetInnerHTML={{__html: soal.e}} /></li>
            </ol>
        </div>
    )
}

export default function gmate(props) {
    const soal = props.soalByKey[props.sekuen[0]]
    const dfSoal = props.soalByKey


    return (
        <div style={{
            padding: '1rem',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'orange'
        }}>
            <h1>G-Mate Test {props.dfSoal.length}</h1>

            {/* <pre>{JSON.stringify (props.leaders)}</pre>
            <pre>{JSON.stringify (soal, null, 2)}</pre>
            <pre>{JSON.stringify (props.kondisiByKey[soal.ref], null, 2)}</pre>
            <pre>{JSON.stringify (props.sekuen, null, 2)}</pre>
            <p>{soal.konten}</p>
            <p>{soal.a}</p>
            <p>{soal.b}</p>
            <p>{soal.c}</p>
            <p>{soal.d}</p>
            <p>{soal.e}</p> */}

            {/* <CetakSoal soal={soal} kondisi={props.kondisiByKey[soal.ref]}/> */}

            {props.sekuen.map(s => (
                <CetakSoal
                    soal={dfSoal[s]}
                    kondisi={props.kondisiByKey[dfSoal[s].ref]}
                />
            ))}
        </div>
    )
}

export const getServerSideProps = async () => {
    const db = await connect()
    const rs = await db.all ("SELECT * FROM soal")
    // console.log(rs);

    const rs2 = await db.get ("SELECT leader FROM meta")
    // console.log(rs2);

    const leaders = rs2.leader.split(" ")
    // console.log(leaders);

    const soalByKey = objectify (rs)
    // console.log(soalByKey);

    const sekuen = getTestSequence (rs, leaders)
    // console.log(sekuen);

    const groupKeys = randomGroupKeys (groupByKey(rs), leaders)
    // console.log(groupKeys);

    const rs3 = await db.all ("SELECT * FROM kondisi")
    // console.log(rs3);

    const kondisiByKey = objectify (rs3)
    console.log(kondisiByKey);

    return {
        props: {
            dfSoal: rs,
            leaders,
            soalByKey,
            sekuen,
            kondisiByKey
        }
    }
}