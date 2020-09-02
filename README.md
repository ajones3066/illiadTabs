# illiadTabs

Requirements: Apache, PHP and MySQL data source.  This can be written to query Alma's user API (https://developers.exlibrisgroup.com/alma/apis/users/), but we're an aleph shop, so I'll leave that to you all.

This is a first attempt to publish a Primo-UI customization that sends bibliographic and user-info to a database table for the creation of ILLiad transactions via their WebAPI.  This service is used in tandem with some PHP files which return JSON to let the user know the transaction was received.
