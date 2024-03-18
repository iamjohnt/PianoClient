export enum Clef{
    BASS_CLEF,
    TREBLE_CLEF
}

export enum KeySigNote {
    C,
    C_SHARP,
    D_FLAT,
    D,
    D_SHARP,
    E_FLAT,
    E,
    F,
    F_SHARP,
    G_FLAT,
    G,
    G_SHARP,
    A_FLAT,
    A,
    A_SHARP,
    B_FLAT,
    B
}

export enum KeySigMode {
    MINOR,
    MAJOR
}

export enum Accidental {
    FLAT,
    SHARP,
    NATURAL
}

export enum KeySigFull {
    // Natural Root Major
    C_MAJOR,
    D_MAJOR,
    E_MAJOR,
    F_MAJOR,
    G_MAJOR,
    A_MAJOR,
    B_MAJOR,

    // Natural Root Minor
    C_MINOR,
    D_MINOR,
    E_MINOR,
    F_MINOR,
    G_MINOR,
    A_MINOR,
    B_MINOR,

    // Sharp Root Major
    C_SHARP_MAJOR,
    D_SHARP_MAJOR,
    F_SHARP_MAJOR,
    G_SHARP_MAJOR,
    A_SHARP_MAJOR,

    // Sharp Root Minor
    C_SHARP_MINOR,
    D_SHARP_MINOR,
    F_SHARP_MINOR,
    G_SHARP_MINOR,
    A_SHARP_MINOR,

    // Flat Root Major
    D_FLAT_MAJOR,
    E_FLAT_MAJOR,
    G_FLAT_MAJOR,
    A_FLAT_MAJOR,
    B_FLAT_MAJOR,

    // Flat Root Minor
    D_FLAT_MINOR,
    E_FLAT_MINOR,
    G_FLAT_MINOR,
    A_FLAT_MINOR,
    B_FLAT_MINOR
}

export enum NoteOnOff {
    ON,
    OFF
}

export enum ChordPool {
    NOTE,
    INTERVAL,
    TRIAD,
    TETRAD,
    NOTE_INTERVAL,
    NOTE_INTERVAL_TRIAD,
    NOTE_INTERVAL_TRIAD_TETRAD
}

export enum WhichHands {
    LEFT,
    RIGHT,
    BOTH
}

export enum KeyboardType {
    VIRTUAL,
    CONNECTED,
    COMPUTER
}