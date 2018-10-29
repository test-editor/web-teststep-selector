with import <nixpkgs> {};

let firefox_62_0_3 = stdenv.mkDerivation rec {
    name = "firefox_62_0_3";
    version = "62.0.3";
    src = fetchurl {
      url = "http://ftp.mozilla.org/pub/firefox/releases/62.0.3/linux-x86_64/en-US/firefox-62.0.3.tar.bz2";
      sha256 = "dafff4bd8b45d82f861c2e7215963461ed8333d75534defe677c3deefb2b3aa2";
    };

  installPhase = ''
    mkdir -p $out/bin
    cp -r ./* "$out/bin/"
    # correct interpreter and rpath for binaries to work
    find $out -type f -perm -0100 \
        -exec patchelf --interpreter "$(cat $NIX_CC/nix-support/dynamic-linker)" \;
   '';
};

in

stdenv.mkDerivation {
    name = "testeditor-angular-development";
    buildInputs = [
        nodejs-10_x
        nodePackages.npm
        nodePackages.yarn
        nodePackages.jsonlint
        bashInteractive
        firefox_62_0_3
        google-chrome
        xvfb_run
        travis
        git
    ];
    shellHook = ''
        # make sure no output is done, since direnv fails with direnv: error unmarshal() base64 decoding: illegal base64 data at input byte ?

        # get a symbolic link to google-chrome-stable such that the karma runner finds the chrome executable (it does not accept google-chrome-stable itself)
        ln -sf $(which google-chrome-stable) `pwd`/node_modules/.bin/google-chrome
        yarn install @angular/cli > /dev/null 2>&1
        # put all linked executables in node_modules on the path
        export PATH=`pwd`/node_modules/.bin:$PATH
    '';
}