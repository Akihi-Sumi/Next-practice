import { useState, useEffect } from "react";
import usePersist from './Persist';
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Calc(props) {
    const [message, setMessage] = useState('')
    const [input, setInput] = useState('')
    const [data, setData] = usePersist('calc-history', [])

    const { data:func,error }=useSWR('/api/func',fetcher)

    // 関数のJSONデータ読み込みがエラーになった時とデータ読み込み中の時の表示
    if (error) return <div className="alert alert-primary text-center">failed to load</div>
    if (!func) return <div className="alert alert-primary text-center">loading...</div>

    const onChange = (e) =>{
        setInput (e.target.value)
    }
    const onKeyPress = (e) =>{
        if (e.key == 'Enter') {
            doAction(e)
        }
    }

    // Enter時の処理
    const doAction = (e) =>{
        const res = eval(input)
        setMessage(res)
        data.unshift(input + ' = ' + res)
        setData(data)
        setInput('')
    }

    // 履歴のクリア処理
    const clear = (e) =>{
        setData([])
        setMessage('Clear history')
    }

    // 関数ボタンの処理
    const doFunc = (e) =>{
        const arr =input.split('.')
        const fid = e.target.id
        const f = func.func[fid]
        const fe = eval(f.function)
        const res = fe(...arr)
        setMessage(res)
        data.unshift(fid + ' = ' + res)
        setData(data)
        setInput('')
    }

    return (
        <div>
            <div className="alert alert-primary">
                <h5>Result: {message}</h5>

                <div className="form-group">
                    <input type='text' className="form-control" value={input} onChange={onChange} onKeyPress={onKeyPress} />
                </div>
                {Object.entries(func.func).map((value, key) =>(
                    <button className="btn btn-secondary m-1" key={key} title={value[1].caption} id={value[0]} onClick={doFunc}>
                        {value[0]}
                    </button>
                ))}
            </div>

            <table className="table">
                <thead>
                    <tr><th>History:</th></tr>
                </thead>
                <tbody>
                    {data.map((value, key) =>(
                        <tr key={key}> <td>{value}</td> </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn btn-warning" onClick={clear}>
                Clear History
            </button>
        </div>
    )
}