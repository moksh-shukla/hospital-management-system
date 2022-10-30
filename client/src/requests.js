
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const backendServer = 'http://localhost:3000';


export let getPatientLogin = async(user_id, password) => {
    try {
        let params = {
            "user_id":user_id,
            "password":password,
        }
        let res = await axios.post(backendServer + '/api' + '/login/patient', params);
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getDoctorLogin = async(user_id, password) => {
    try {
        let params = {
            "user_id":user_id,
            "password":password,
        }
        let res = await axios.post(backendServer + '/api' + '/login/doctor', params);
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getAppointments = async () => {
    try {
        let res = await axios.get(backendServer + '/api' + '/appointments')
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getDoctors = async () => {
    try {
        let res = await axios.get(backendServer + '/api' + '/doctors')
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getPatients = async () => {
    try {
        let res = await axios.get(backendServer + '/api' + '/patients')
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getNurses = async () => {
    try {
        let res = await axios.get(backendServer + '/api' + '/nurses')
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getProcedures = async () => {
    try {
        let res = await axios.get(backendServer + '/api' + '/procedures')
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getRooms = async () => {
    try {
        let res = await axios.get(backendServer + '/api' + '/rooms')
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getStayRooms = async () => {
    try {
        let res = await axios.get(backendServer + '/api' + '/stayrooms')
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getDepts = async () => {
    try {
        let res = await axios.get(backendServer + '/api' + '/depts')
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getMedicines = async () => {
    try {
        let res = await axios.get(backendServer + '/api' + '/medicines')
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getQueries = async () => {
    try{
        let res = await axios.get(backendServer + '/api' + '/queries')
        return res.data

    }
    catch (e) {
        console.log(e)
    }
}

export let getRepliesByParentQueryId = async (parent_query_id) => {
    try{
        let params = {
            "parent_query_id": parent_query_id
        }
        let res = await axios.get(backendServer + '/api' + '/replies', {params})
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getDoctorQueries = async (doctor_id) => {
    try{
        let params = {
            "doctor_id":doctor_id
        }
        let res = await axios.get(backendServer + '/doctor' + '/queries', {params})
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getPatientQueries = async (patient_id) => {
    try{
        let params = {
            "patient_id":patient_id
        }
        let res = await axios.get(backendServer + '/patient' + '/queries', {params})
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getAppointmentsByDoctorId = async (doctor_id) => {
    try {
        let params = {
            "doctor_id" : doctor_id
        }
        let res = await axios.get(backendServer + '/doctor' + '/appointments', {params})
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getPrescriptionsByDoctorId = async (doctor_id) => {
    try {
        let params = {
            "doctor_id" : doctor_id
        }
        let res = await axios.get(backendServer + '/doctor' + '/prescriptions', {params})
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getAppointmentsByPatientId = async (patient_id) => {
    try {
        let params = {
            "patient_id" : patient_id
        }
        let res = await axios.get(backendServer + '/patient' + '/appointments', {params})
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getPrescriptionsByPatientId = async (patient_id) => {
    try {
        let params = {
            "patient_id" : patient_id
        }
        let res = await axios.get(backendServer + '/patient' + '/prescriptions', {params})
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getStays = async () => {
    try {
        let res = await axios.get(backendServer + '/api' + '/stay')
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getDoctorProfile = async (doctor_id) => {
    try {
        let params = {
            "doctor_id": doctor_id
        }
        let res = await axios.get(backendServer + '/doctor' + '/profile', { params })
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getNurseProfile = async (nurse_id) => {
    try {
        let params = {
            "nurse_id": nurse_id
        }
        let res = await axios.get(backendServer + '/api/nurses' + '/profile', { params })
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

export let getPatientProfile = async (patient_id) => {
    try {
        let params = {
            "patient_id": patient_id
        }
        let res = await axios.get(backendServer + '/patient' + '/profile', { params })
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}