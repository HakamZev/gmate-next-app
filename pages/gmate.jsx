import connect from "../lib/database"
import {
    objectify,
    getTestSequence,
    randomGroupKeys
} from "gmate"

export default function gmate(props) {
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
            <p>{props.soalByKey.S23.konten}</p>
            <p>{props.soalByKey.S23.a}</p>
            <p>{props.soalByKey.S23.b}</p>
            <p>{props.soalByKey.S23.c}</p>
            <p>{props.soalByKey.S23.d}</p>
            <p>{props.soalByKey.S23.e}</p>
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