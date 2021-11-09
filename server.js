const express = require('express')
const client = new Client (process.env.DATABASE_URL || 'postgres://localhost/')