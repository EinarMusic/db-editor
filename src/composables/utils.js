export const recordsFormat = (userRecords) => {
    let ffmepgFormat = ""

    userRecords.forEach((record, index) => {
        ffmepgFormat += `between(t, ${record.split(",")[0]}, ${record.split(",")[1]})`
        if (userRecords.length - 1 != index) ffmepgFormat += '+'
    });
    
    return {
        video: `select='${ffmepgFormat}', setpts=N/FRAME_RATE/TB`, 
        audio: `aselect='${ffmepgFormat}', asetpts=N/SR/TB`
    }
}

export const toHHMMSS = (time) => {
    if (time) return new Date(time * 1000).toISOString().substring(11, 19)
}
