import connect from "../lib/database"
import {
    objectify,
    getTestSequence,
    randomGroupKeys
} from "gmate"

export default function gmate(props) {
    const soal = props.soalByKey.S15

    return (
        <div style={{
            padding: '1rem',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'orange'
        }}>
            <h1>G-Mate Test {props.dfSoal.length}</h1>
            <pre>{JSON.stringify (props.leaders)}</pre>
            {/* <pre>{JSON.stringify (props.soalByKey, null, 2)}</pre> */}
            <p>{soal.konten}</p>
            <p>{soal.a}</p>
            <p>{soal.b}</p>
            <p>{soal.c}</p>
            <p>{soal.d}</p>
            <p>{soal.e}</p>
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
    console.log(sekuen);

    return {
        props: {
            dfSoal: rs,
            leaders,
            soalByKey,
            sekuen
        }
    }
}