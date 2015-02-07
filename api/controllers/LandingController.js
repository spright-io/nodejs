/**
 * LandingController
 *
 * @description :: Server-side logic for landing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports =
{
    state: function (req, res)
    {
        res.view("landing/state",{
            current_page: "landing_state",
            page_params: {
                state: req.params.state
            }
        });
    },
    city: function (req, res)
    {
        res.view("landing/city",{
            current_page: "landing_city"
        });
    },
    zip: function (req, res)
    {
        ZipCode.findOne({id:req.params.zip, type:"zip_code"}, function(err, zip_data)
        {
            if (err) {return res.serverError(err);}

            var zip = zip_data;

            var q =
            {
                "query": {
                    "match_all": {}
                },
                "filter": {
                    "term": {
                        "zip_code": zip.zip_code
                    }
                }
            };

            Vehicle.search({body:q, size: 15, from:0}, function(err, data)
            {
                if (err) {return res.serverError(err);}

                res.view("landing/zip",{
                    vehicles: data,
                    zip_code:zip,
                    current_page: "landing_zip"
                });
            });
        });
    }
};
