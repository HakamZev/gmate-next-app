import connect from "../lib/database"
import {
    objectify,
    getTestSequence,
    randomGroupKeys,
    groupByKey
} from "gmate"

import CetakSoal from "../components/cetak-soal"
import { useEffect, useState } from "react"

export default function gmate({
    dfSoal, leaders, soalByKey, sekuen, kondisiByKey
}) {
    const [index, setIndex] = useState (0)
    const [seq, setSeq] = useState (sekuen[0])

    useEffect(() => {
        setSeq (sekuen[index])
    }), [index, setSeq]

    function next () {
        if (index == 44) setIndex (0)
        else setIndex (index+1)
    }

    function back () {
        if (index == 0) return
        setIndex (index-1)
    }

    return (
        <div style={{
            padding: '1rem',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'orange'
        }}>
            <h1>G-Mate Test {soalByKey.length} {index+1} {seq}</h1>
            <div>
                <CetakSoal
                    soal={soalByKey[seq]}
                    kondisi={kondisiByKey[soalByKey[seq].ref]}
                />
            </div>
            <button style={{background:"red"}} onClick={back}>back</button>
            <button style={{background:"green"}} onClick={next}>next</button>
        </div>
    )
}

export const getServerSideProps = async () => {
    const db = await connect()
    const rs = await db.all ("SELECT * FROM soal")

    const rs2 = await db.get ("SELECT leader FROM meta")

    const leaders = rs2.leader.split(" ")

    const soalByKey = objectify (rs)

    const sekuen = getTestSequence (rs, leaders)

    const groupKeys = randomGroupKeys (groupByKey(rs), leaders)

    const rs3 = await db.all ("SELECT * FROM kondisi")

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