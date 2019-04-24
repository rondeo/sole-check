const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('getting your collection');
    const queryText = `SELECT "shoe"."id", "shoe_name", "user_id", "style", "story", "image", "date_added", "last_worn", "deadstock", 
            "brand"."brand", "c1"."color" AS "color1", "c2"."color" AS "color2" FROM "shoe"
            JOIN "brand" ON "brand"."id" = "shoe"."brand_id"
            JOIN "color" AS "c1" ON "c1"."id" = "shoe"."color1_id"
            JOIN "color" AS "c2" ON "c2"."id" = "shoe"."color2_id" 
            WHERE "user_id" = 26`;
	pool.query(queryText)
	    .then((result) => res.send(result.rows))
	    .catch((error) => {res.sendStatus(500); console.log('something went wrong getting collection', error);
	});
});

module.exports = router;