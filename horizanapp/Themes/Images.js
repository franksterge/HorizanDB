const images = {
    west_coast: require("../assets/images/west_coast.png"),
    central: require("../assets/images/mid_country.png"),
    north_east: require("../assets/images/north_east_coast.png"),
    south_east: require("../assets/images/south_east_coast.png"),
    urban: require("../assets/images/big_city.png"),
    suburban: require("../assets/images/small_house.png"),
    rural: require("../assets/images/barn.png"),
    coed: require("../assets/images/boy_girl_shirts.png"),
    men_only: require("../assets/images/single_boy_shirt.png"),
    women_only: require("../assets/images/shirt_1_girl.png"),
    public: require("../assets/images/big_single_state_building.png"),
    private: require("../assets/images/single_state_building.png"),
    logo: require("../assets/images/logo.png"),
    google_login: require("../assets/images/google.png"),
    logo_full:require("../assets/images/logo_full.png"),
    adelphi_university: require("../assets/images/adelphi_university.png"),
    american_university: require("../assets/images/american_university.png"),
    andrews_university: require("../assets/images/andrews_university.png"),
    arizona_state_university_tempe: require("../assets/images/arizona_state_university_tempe.png"),
    ashland_university: require("../assets/images/ashland_university.png"),
    auburn_university: require("../assets/images/auburn_university.png"),
    azusa_pacific_university: require("../assets/images/azusa_pacific_university.png"),
    ball_state_university: require("../assets/images/ball_state_university.png"),
    baylor_university: require("../assets/images/baylor_university.png"),
    benedictine_university: require("../assets/images/benedictine_university.png"),
    binghamton_university_suny: require("../assets/images/binghamton_university_suny.png"),
    biola_university: require("../assets/images/biola_university.png"),
    boston_college: require("../assets/images/boston_college.png"),
    boston_university: require("../assets/images/boston_university.png"),
    bowling_green_state_university: require("../assets/images/bowling_green_state_university.png"),
    brandeis_university: require("../assets/images/brandeis_university.png"),
    brigham_young_university_provo: require("../assets/images/brigham_young_university_provo.png"),
    brown_university: require("../assets/images/brown_university.png"),
    california_institute_of_technology: require("../assets/images/california_institute_of_technology.png"),
    california_state_university_fresno: require("../assets/images/california_state_university_fresno.png"),
    california_state_university_fullerton: require("../assets/images/california_state_university_fullerton.png"),
    carnegie_mellon_university: require("../assets/images/carnegie_mellon_university.png"),
    case_western_reserve_university: require("../assets/images/case_western_reserve_university.png"),
    central_michigan_university: require("../assets/images/central_michigan_university.png"),
    clark_university: require("../assets/images/clark_university.png"),
    clarkson_university: require("../assets/images/clarkson_university.png"),
    clemson_university: require("../assets/images/clemson_university.png"),
    colarado_school_of_mines: require("../assets/images/colarado_school_of_mines.png"),
    colarado_state_university: require("../assets/images/colarado_state_university.png"),
    college_of_william_and_mary: require("../assets/images/college_of_william_and_mary.png"),
    columbia_university: require("../assets/images/columbia_university.png"),
    cornell_university: require("../assets/images/cornell_university.png"),
    dallas_baptist_university: require("../assets/images/dallas_baptist_university.png"),
    dartmouth_college: require("../assets/images/dartmouth_college.png"),
    depaul_university: require("../assets/images/depaul_university.png"),
    drexel_university: require("../assets/images/drexel_university.png"),
    duke_university: require("../assets/images/duke_university.png"),
    duquesne_university: require("../assets/images/duquesne_university.png"),
    east_carolina_university: require("../assets/images/east_carolina_university.png"),
    edgewood_college: require("../assets/images/edgewood_college.png"),
    emory_university: require("../assets/images/emory_university.png"),
    florida_institute_of_technology: require("../assets/images/florida_institute_of_technology.png"),
    florida_state_university: require("../assets/images/florida_state_university.png"),
    fordham_university: require("../assets/images/fordham_university.png"),
    gardner_webb_university: require("../assets/images/gardner_webb_university.png"),
    george_mason_university: require("../assets/images/george_mason_university.png"),
    george_washington_university: require("../assets/images/george_washington_university.png"),
    georgetown_university: require("../assets/images/georgetown_university.png"),
    georgia_institute_of_technology: require("../assets/images/georgia_institute_of_technology.png"),
    harvard_university: require("../assets/images/harvard_university.png"),
    hofstra_university: require("../assets/images/hofstra_university.png"),
    howard_university: require("../assets/images/howard_university.png"),
    illinois_institute_of_technology: require("../assets/images/illinois_institute_of_technology.png"),
    illinois_state_university: require("../assets/images/illinois_state_university.png"),
    immaculata_university: require("../assets/images/immaculata_university.png"),
    indiana_university_bloomington: require("../assets/images/indiana_university_bloomington.png"),
    indiana_university_purdue_university_indianapolis: require("../assets/images/indiana_university_purdue_university_indianapolis.png"),
    iowa_state_university: require("../assets/images/iowa_state_university.png"),
    johns_hopkins_university: require("../assets/images/johns_hopkins_university.png"),
    kansas_state_university: require("../assets/images/kansas_state_university.png"),
    kent_state_university: require("../assets/images/kent_state_university.png"),
    lehigh_university: require("../assets/images/lehigh_university.png"),
    lesley_university: require("../assets/images/lesley_university.png"),
    lipscomb_university: require("../assets/images/lipscomb_university.png"),
    louisiana_state_university: require("../assets/images/louisiana_state_university.png"),
    louisiana_tech_university: require("../assets/images/louisiana_tech_university.png"),
    loyola_university_chicago: require("../assets/images/loyola_university_chicago.png"),
    marquette_university: require("../assets/images/marquette_university.png"),
    maryville_university_of_stlouis: require("../assets/images/maryville_university_of_stlouis.png"),
    massachusetts_institute_of_technology: require("../assets/images/massachusetts_institute_of_technology.png"),
    mercer_university: require("../assets/images/mercer_university.png"),
    miami_university_oxford: require("../assets/images/miami_university_oxford.png"),
    michigan_state_university: require("../assets/images/michigan_state_university.png"),
    michigan_technological_university: require("../assets/images/michigan_technological_university.png"),
    mississippi_state_university: require("../assets/images/mississippi_state_university.png"),
    missouri_university_of_science_technology: require("../assets/images/missouri_university_of_science_technology.png"),
    montana_state_university: require("../assets/images/montana_state_university.png"),
    new_jersey_institute_of_technology: require("../assets/images/new_jersey_institute_of_technology.png"),
    new_mexico_state_university: require("../assets/images/new_mexico_state_university.png"),
    new_school: require("../assets/images/new_school.png"),
    north_carolina_state_university_raleigh: require("../assets/images/north_carolina_state_university_raleigh.png"),
    northeastern_university: require("../assets/images/northeastern_university.png"),
    northern_illinois_university: require("../assets/images/northern_illinois_university.png"),
    northwestern_university: require("../assets/images/northwestern_university.png"),
    nova_southeastern_university: require("../assets/images/nova_southeastern_university.png"),
    ohio_state_university_columbus: require("../assets/images/ohio_state_university_columbus.png"),
    ohio_university: require("../assets/images/ohio_university.png"),
    oklahoma_state_university: require("../assets/images/oklahoma_state_university.png"),
    old_dominion_university: require("../assets/images/old_dominion_university.png"),
    oregon_state_university: require("../assets/images/oregon_state_university.png"),
    pace_university: require("../assets/images/pace_university.png"),
    pennsylvania_state_university_university_park: require("../assets/images/pennsylvania_state_university_university_park.png"),
    pepperdine_university: require("../assets/images/pepperdine_university.png"),
    princeton_university: require("../assets/images/princeton_university.png"),
    purdue_university_west_lafayette: require("../assets/images/purdue_university_west_lafayette.png"),
    rensselaer_polytechnic_institute: require("../assets/images/rensselaer_polytechnic_institute.png"),
    rice_university: require("../assets/images/rice_university.png"),
    robert_morris_university: require("../assets/images/robert_morris_university.png"),
    rochester_institute_of_technology: require("../assets/images/rochester_institute_of_technology.png"),
    rutgers_university_new_brunswick: require("../assets/images/rutgers_university_new_brunswick.png"),
    rutgers_university_newark: require("../assets/images/rutgers_university_newark.png"),
    saint_louis_university: require("../assets/images/saint_louis_university.png"),
    san_diego_state_university: require("../assets/images/san_diego_state_university.png"),
    seattle_pacific_university: require("../assets/images/seattle_pacific_university.png"),
    seton_hall_university: require("../assets/images/seton_hall_university.png"),
    shenandoah_university: require("../assets/images/shenandoah_university.png"),
    south_dakota_state_university: require("../assets/images/south_dakota_state_university.png"),
    southern_methodist_university: require("../assets/images/southern_methodist_university.png"),
    st_john_fisher_college: require("../assets/images/st_john_fisher_college.png"),
    st_johns_university: require("../assets/images/st_johns_university.png"),
    stanford_university: require("../assets/images/stanford_university.png"),
    stevens_institute_of_technology: require("../assets/images/stevens_institute_of_technology.png"),
    stony_brook_university_suny: require("../assets/images/stony_brook_university_suny.png"),
    suffolk_university: require("../assets/images/suffolk_university.png"),
    syracuse_university: require("../assets/images/syracuse_university.png"),
    temple_university: require("../assets/images/temple_university.png"),
    tennessee_technolgical_university: require("../assets/images/tennessee_technolgical_university.png"),
    texas_am_university_college_station: require("../assets/images/texas_a&m_university_college_station.png"),
    texas_christian_university: require("../assets/images/texas_christian_university.png"),
    texas_tech_university: require("../assets/images/texas_tech_university.png"),
    the_catholic_university_of_america: require("../assets/images/the_catholic_university_of_america.png"),
    tufts_university: require("../assets/images/tufts_university.png"),
    tulane_university: require("../assets/images/tulane_university.png"),
    union_university: require("../assets/images/union_university.png"),
    university_of_alabama: require("../assets/images/university_of_alabama.png"),
    university_of_alabama_birmingham: require("../assets/images/university_of_alabama_birmingham.png"),
    university_of_alabama_huntsville: require("../assets/images/university_of_alabama_huntsville.png"),
    university_of_alaska_fairbanks: require("../assets/images/university_of_alaska_fairbanks.png"),
    university_of_albany_suny: require("../assets/images/university_of_albany_suny.png"),
    university_of_arizona: require("../assets/images/university_of_arizona.png"),
    university_of_arkansas: require("../assets/images/university_of_arkansas.png"),
    university_of_buffalo_suny: require("../assets/images/university_of_buffalo_suny.png"),
    university_of_california_berkeley: require("../assets/images/university_of_california_berkeley.png"),
    university_of_california_davis: require("../assets/images/university_of_california_davis.png"),
    university_of_california_irvine: require("../assets/images/university_of_california_irvine.png"),
    university_of_california_los_angeles: require("../assets/images/university_of_california_los_angeles.png"),
    university_of_california_merced: require("../assets/images/university_of_california_merced.png"),
    university_of_california_riverside: require("../assets/images/university_of_california_riverside.png"),
    university_of_california_san_diego: require("../assets/images/university_of_california_san_diego.png"),
    university_of_california_santa_barbara: require("../assets/images/university_of_california_santa_barbara.png"),
    university_of_california_santa_cruz: require("../assets/images/university_of_california_santa_cruz.png"),
    university_of_central_florida: require("../assets/images/university_of_central_florida.png"),
    university_of_chicago: require("../assets/images/university_of_chicago.png"),
    university_of_cincinnati: require("../assets/images/university_of_cincinnati.png"),
    university_of_colorado_denver: require("../assets/images/university_of_colorado_denver.png"),
    university_of_connecticut: require("../assets/images/university_of_connecticut.png"),
    university_of_dayton: require("../assets/images/university_of_dayton.png"),
    university_of_delaware: require("../assets/images/university_of_delaware.png"),
    university_of_denver: require("../assets/images/university_of_denver.png"),
    university_of_florida: require("../assets/images/university_of_florida.png"),
    university_of_georgia: require("../assets/images/university_of_georgia.png"),
    university_of_hartford: require("../assets/images/university_of_hartford.png"),
    university_of_hawaii_manoa: require("../assets/images/university_of_hawaii_manoa.png"),
    university_of_houston: require("../assets/images/university_of_houston.png"),
    university_of_idaho: require("../assets/images/university_of_idaho.png"),
    university_of_illinois_chicago: require("../assets/images/university_of_illinois_chicago.png"),
    university_of_illinois_urbana_champaign: require("../assets/images/university_of_illinois_urbana_champaign.png"),
    university_of_iowa: require("../assets/images/university_of_iowa.png"),
    university_of_kansas: require("../assets/images/university_of_kansas.png"),
    university_of_kentucky: require("../assets/images/university_of_kentucky.png"),
    university_of_la_verne: require("../assets/images/university_of_la_verne.png"),
    university_of_louisville: require("../assets/images/university_of_louisville.png"),
    university_of_maine: require("../assets/images/university_of_maine.png"),
    university_of_maryland_baltimore_county: require("../assets/images/university_of_maryland_baltimore_county.png"),
    university_of_maryland_college_park: require("../assets/images/university_of_maryland_college_park.png"),
    university_of_massachusetts_amherst: require("../assets/images/university_of_massachusetts_amherst.png"),
    university_of_massachusetts_boston: require("../assets/images/university_of_massachusetts_boston.png"),
    university_of_massachusetts_dartmouth: require("../assets/images/university_of_massachusetts_dartmouth.png"),
    university_of_massachusetts_lowell: require("../assets/images/university_of_massachusetts_lowell.png"),
    university_of_miami: require("../assets/images/university_of_miami.png"),
    university_of_michigan_ann_arbor: require("../assets/images/university_of_michigan_ann_arbor.png"),
    university_of_minnesota_twin_cities: require("../assets/images/university_of_minnesota_twin_cities.png"),
    university_of_mississippi: require("../assets/images/university_of_mississippi.png"),
    university_of_missouri: require("../assets/images/university_of_missouri.png"),
    university_of_missouri_kansas_city: require("../assets/images/university_of_missouri_kansas_city.png"),
    university_of_missouri_st_louis: require("../assets/images/university_of_missouri_st_louis.png"),
    university_of_montana: require("../assets/images/university_of_montana.png"),
    university_of_nebraska_lincoln: require("../assets/images/university_of_nebraska_lincoln.png"),
    university_of_new_hampshire: require("../assets/images/university_of_new_hampshire.png"),
    university_of_new_mexico: require("../assets/images/university_of_new_mexico.png"),
    university_of_north_carolina_chapel_hill: require("../assets/images/university_of_north_carolina_chapel_hill.png"),
    university_of_north_carolina_charlotte: require("../assets/images/university_of_north_carolina_charlotte.png"),
    university_of_north_carolina_greensboro: require("../assets/images/university_of_north_carolina_greensboro.png"),
    university_of_north_dakota: require("../assets/images/university_of_north_dakota.png"),
    university_of_notre_dame: require("../assets/images/university_of_notre_dame.png"),
    university_of_oklahoma: require("../assets/images/university_of_oklahoma.png"),
    university_of_oregon: require("../assets/images/university_of_oregon.png"),
    university_of_pennsylvania: require("../assets/images/university_of_pennsylvania.png"),
    university_of_pittsburgh: require("../assets/images/university_of_pittsburgh.png"),
    university_of_rhode_island: require("../assets/images/university_of_rhode_island.png"),
    university_of_rochester: require("../assets/images/university_of_rochester.png"),
    university_of_san_diego: require("../assets/images/university_of_san_diego.png"),
    university_of_san_francisco: require("../assets/images/university_of_san_francisco.png"),
    university_of_south_carolina: require("../assets/images/university_of_south_carolina.png"),
    university_of_south_dakota: require("../assets/images/university_of_south_dakota.png"),
    university_of_south_florida: require("../assets/images/university_of_south_florida.png"),
    university_of_southern_california: require("../assets/images/university_of_southern_california.png"),
    university_of_southern_mississippi: require("../assets/images/university_of_southern_mississippi.png"),
    university_of_st_thomas: require("../assets/images/university_of_st_thomas.png"),
    university_of_tennessee: require("../assets/images/university_of_tennessee.png"),
    university_of_texas_austin: require("../assets/images/university_of_texas_austin.png"),
    university_of_texas_dallas: require("../assets/images/university_of_texas_dallas.png"),
    university_of_the_pacific: require("../assets/images/university_of_the_pacific.png"),
    university_of_tulsa: require("../assets/images/university_of_tulsa.png"),
    university_of_utah: require("../assets/images/university_of_utah.png"),
    university_of_vermont: require("../assets/images/university_of_vermont.png"),
    university_of_virginia: require("../assets/images/university_of_virginia.png"),
    university_of_washington: require("../assets/images/university_of_washington.png"),
    university_of_wisconsin_madison: require("../assets/images/university_of_wisconsin_madison.png"),
    university_of_wyoming: require("../assets/images/university_of_wyoming.png"),
    utah_state_university: require("../assets/images/utah_state_university.png"),
    vanderbilt_university: require("../assets/images/vanderbilt_university.png"),
    villanova_university: require("../assets/images/villanova_university.png"),
    virginia_commonwealth_university: require("../assets/images/virginia_commonwealth_university.png"),
    virginia_tech: require("../assets/images/virginia_tech.png"),
    wake_forest_university: require("../assets/images/wake_forest_university.png"),
    washington_state_university: require("../assets/images/washington_state_university.png"),
    washington_university_st_louis: require("../assets/images/washington_university_st_louis.png"),
    west_virginia_university: require("../assets/images/west_virginia_university.png"),
    western_michigan_university: require("../assets/images/western_michigan_university.png"),
    widener_university: require("../assets/images/widener_university.png"),
    worcester_polytechnic_institute: require("../assets/images/worcester_polytechnic_institute.png"),
    yale_university: require("../assets/images/yale_university.png"),
    yeshiva_university: require("../assets/images/yeshiva_university.png"),
    heart_icon: require("../assets/images/heart.png"),
    clock_icon: require("../assets/images/clock.png"),
    check_icon: require("../assets/images/check_mark.png")
}
export default images