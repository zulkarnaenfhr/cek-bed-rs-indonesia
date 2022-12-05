<?php 
    include "../../configData.php";
    $idRS = $_GET['idRumahSakit'];
    $type = $_GET['type'];
    $kodeProv = $_GET['provinsi'];
    $kodeKota = $_GET['kota'];

    $dataDetails = getDetailRS($idRS,$type);
?>

<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Bootstrap CSS -->
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossorigin="anonymous">

        <!-- link css details rumah sakit  -->
        <link rel="stylesheet" href="DetailsRumahSakit.css">

        <!-- link css footer  -->
        <link rel="stylesheet" href="../../footer.css">

        <!-- Fontawesome CSS -->
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">

        <title>Detail Rumah Sakit</title>
    </head>
    <body>

        <div id="navbarLocation"></div>

        <main>
            <div id="detailsRumahSakit">
                <div class="container">
                    <div class="detailsRumahSakit-content row">
                        <div class="navInformation">
                            <h1 class="detailsRumahSakit-title">
                                Details Rumah Sakit
                            </h1>
                            <h6>
                                <?php echo $dataDetails['name'] ?>
                            </h6>
                            <h6>
                                <?php echo $dataDetails['address'] ?>
                            </h6>
                            <div class="row rowGoTo">
                                <div class="col-xl-2 col-lg-6">
                                    <a href="tel:<?php echo $dataDetails['phone']?>">
                                        <button class="buttonCall btn btn-primary">
                                            <i class="fas fa-phone"></i> <?php echo $dataDetails['phone']?>
                                        </button>
                                    </a>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <a href="https://www.google.co.id/maps/search/<?php echo $dataDetails['name'];?>">
                                        <button class="buttonHospitalInformation btn btn-primary">
                                            Maps <i class="fas fa-map-marker-alt"></i> 
                                        </button>
                                    </a>
                                </div>
                                <div class="col-xl-6 col-lg-12">
                                    <form action="../Daftar Rumah Sakit/DaftarRumahSakit.php" method="get">
                                        <input type="hidden" value="<?php echo $kodeProv ?>" name="provinsi">
                                        <input type="hidden" value="<?php echo $kodeKota ?>" name="kota">
                                        <input type="hidden" value="<?php echo $type ?>" name="type">
                                        <button type="submit" class="buttonBacktoSearch btn btn-primary">
                                            Cari Rumah Sakit Lokasi Lain
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <?php 
                            for ($i=0; $i < count($dataDetails['bedDetail']); $i++) { ?>
                        <div class="detailsInformation">
                            <div class="card">
                                <div class="card-body row">
                                    <button
                                        class="buttonDropDown"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseExample<?php echo $i ?>"
                                        aria-expanded="false"
                                        aria-controls="collapseExample<?php echo $i ?>">
                                        <div class="row">
                                            <div class="col-11">
                                                <p class="bedTitle">
                                                    <?php echo $dataDetails['bedDetail'][$i]['stats']['title'] ?>
                                                </p>
                                                <p class="timeUpdate">
                                                    <?php  echo $dataDetails['bedDetail'][$i]['time']?>
                                                </p>
                                            </div>
                                            <div class="col-1 dropDownIcon">
                                                <i class="fas fa-chevron-circle-down"></i>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div class="collapse" id="collapseExample<?php echo $i ?>">
                                    <div class="card-body">
                                        <div class="row cardDetailsCollapse">
                                            <div class="col-md-4">
                                                <div class="cardBed bedTersedia">
                                                    <h6 class="informationCategory">Bed Tersedia</h6>
                                                    <h6>
                                                        <?php echo  $dataDetails['bedDetail'][$i]['stats']['bed_available']?>
                                                    </h6>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="cardBed bedKosong">
                                                    <h6 class="informationCategory">Bed Kosong</h6>
                                                    <h6>
                                                        <?php echo  $dataDetails['bedDetail'][$i]['stats']['bed_empty']?>
                                                    </h6>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="cardBed bedAntri">
                                                    <h6 class="informationCategory">Antrian</h6>
                                                    <h6>
                                                        <?php echo  $dataDetails['bedDetail'][$i]['stats']['queue']?>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <?php    }
                        ?>
                    </div>
                </div>
            </div>
            <footer>
                <div class="container">
                    <p>Design and Developed by
                        <span>Electic Code</span>
                        @Covid Editon</p>
                </div>
            </footer>
        </main>

        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>

    </body>
</html>