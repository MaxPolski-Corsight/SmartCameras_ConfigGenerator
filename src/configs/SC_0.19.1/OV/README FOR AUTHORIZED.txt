AUTHORIZED README

When the whitelist config is implemented, it is important to make sure that ALL CAMERAS with a whitelist/authorized watchlist is set in the GUI with:

- Threshold lowered to 35 (can be adjusted based on environment)

- Analysis quality set to 'Average'


Note: This is not a 'one size fits all' config. Whitelist/Authorized config is dependent on each camera environment and DB size, so adjustments may need to be made per deployment. 

For example, the min_detection_width and whitelist_certainty_min_crop_size could be adjusted based on the camera environment.
