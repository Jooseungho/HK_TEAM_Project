package com.his.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NursePageController {

    @GetMapping("/nurse/dashboard")
    public String dashboard() {
        return "nurse/nurse_dashboard";
    }

    @GetMapping("/nurse/patient_register")
    public String patientRegister() {
        return "nurse/patient_register";
    }

    @GetMapping("/nurse/visit_register")
    public String visitRegister() {
        return "nurse/visit_register";
    }

    @GetMapping("/nurse/treatment")
    public String treatmentPage() {
        return "nurse/nurse_treatment";
    }

    @GetMapping("/nurse/bill")
    public String billPage() {
        return "nurse/nurse_bill";
    }

    @GetMapping("/nurse/document")
    public String documentPage() {
        return "nurse/nurse_document";
    }
}
